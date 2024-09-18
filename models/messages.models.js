import { db } from "../config/pg.config.js"

export const _createMessages = async (sender_id, receiver_id, message_text, item_id, conversation_id) => {
  try {
    const result = await db("messages").insert({
        sender_id,
        receiver_id,
        message_text,
        item_id,
        conversation_id,
    }).returning("*");

    await db("conversations")
      .where("conversation_id", conversation_id)
      .update({ 
        is_deleted_by_conversation_owner: false,  
        is_deleted_by_item_owner: false 
      });

    return result[0];
  }catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const _getOneConversation = async (receiver_id, sender_id, item_id, my_user_id) => {
    try {
      // Получаем сообщения
      const messages = await db("messages")
        .select("*")
        .where({ receiver_id, sender_id, item_id })
        .orWhere({ receiver_id: sender_id, sender_id: receiver_id, item_id: item_id })
        .orderBy("timestamp", "asc");
  
      if (messages.length === 0) {
        return { messages: [], user: null };
      }
      
      const otherUserId = messages[0].sender_id === my_user_id ? messages[0].sender_id: messages[0].receiver_id;

      const user = await db("users")
        .select("*")
        .where("user_id", otherUserId)
        .first();

      const otherUserIdSecond = messages[0].sender_id === my_user_id ? messages[0].receiver_id: messages[0].sender_id;

      const userSecond = await db("users")
        .select("*")
        .where("user_id", otherUserIdSecond)
        .first();  
      
      const item = await db("items")
        .select("*")
        .where("item_id", item_id) 
        .first();  

      return { messages, user, userSecond, item };
    } catch (error) {
      throw new Error(`Error in messages.models: ${error.message}`);
    }
  };

export const _deleteMessage = (message_id) => {
    return db("messages").delete("*").where({ message_id })
};

export const _markMessagesAsRead = async (conversation_id, user_id) => {
  try {
      const updatedCount = await db("messages")
          .where({ conversation_id, receiver_id: user_id })
          .update({ read: true });

      const updatedMessages = await db("messages")
          .select("*")
          .where({ conversation_id })
          .andWhere({ receiver_id: user_id });

      return updatedMessages;
  } catch (error) {
      console.error(`Error in messages.models: ${error.message}`);
      throw new Error(`Error in messages.models: ${error.message}`);
  }
};

  export const _getUnreadbleMessages = async (user_id) => {
    try {
        const result = await db("messages")
        .select("*")
        .where({ receiver_id: user_id })
        .andWhere({ read: false })
        return result
    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
  };

  export const _getLastMessageFromEveryConversation = async (user_id) => {
    try {
      // Шаг 1: Получить все conversation_id для заданного user_id
      const userConversationsQuery = db('conversations')
        .select('conversation_id')
        /*.where(function() {
          this.where('conversation_owner_id', user_id)
            .orWhere('item_owner_id', user_id);
        });
        */
        
        
        .where(function() {
          this.where('conversation_owner_id', user_id)
          .andWhere('is_deleted_by_conversation_owner', false)
          .orWhere('item_owner_id', user_id)
          .andWhere('is_deleted_by_item_owner', false);
        });

      // Выполняем запрос для получения всех conversation_id
      const userConversations = (await userConversationsQuery).map(row => row.conversation_id);
  
      // Шаг 2: Подсчитать непрочитанные сообщения для каждой беседы
      const unreadMessagesCountsQuery = db('messages')
        .count('* as unread_count')
        .where('read', false)
        .andWhere(function() {
        this.whereIn('conversation_id', userConversations);
        })
        .groupBy('conversation_id');
  
      const unreadMessagesCounts = await unreadMessagesCountsQuery;
  
      // Преобразуем результат подсчета в объект для удобства
      const unreadCountsMap = unreadMessagesCounts.reduce((acc, row) => {
        acc[row.conversation_id] = row.unread_count;
        return acc;
      }, {});
  
      //user_id
      // Шаг 3: Получить последние сообщения для каждой беседы
      const lastMessages = await db('messages as m')
        .select('m.conversation_id', 'm.message_id', 'm.sender_id', 'm.receiver_id', 'm.message_text', 'm.timestamp')
        .join(
          db.raw(`
            (SELECT conversation_id, MAX(timestamp) AS max_timestamp
             FROM messages
             GROUP BY conversation_id) lm
          `),
          function() {
            this.on('m.conversation_id', '=', 'lm.conversation_id')
              .andOn('m.timestamp', '=', 'lm.max_timestamp');
          }
        )
        .whereIn('m.conversation_id', userConversations) // Используем полученные conversation_id

        .join('users as sender', 'm.sender_id', 'sender.user_id')
        .join('users as receiver', 'm.receiver_id', 'receiver.user_id')
        .join('items', 'm.item_id', 'items.item_id')
        .select(
          'm.*',
          'sender.username as sender_username',
          'receiver.username as receiver_username',
          'items.title as item_title',
          'items.price as item_price',
          'items.owner_id as item_owner_id',
          'items.images as images',
          'items.deleted as deleted'
        )
        .orderBy('m.timestamp', 'asc');
  
      // Шаг 4: Добавить количество непрочитанных сообщений к результатам
      const result = lastMessages.map(message => ({
        ...message,
        unread_count: unreadCountsMap[message.conversation_id] || 0
      }));
  
      return result;
    } catch (error) {
      console.error(`Error retrieving last messages for user: ${error.message}`);
      throw new Error(`Error retrieving last messages for user: ${error.message}`);
    }
  };
  



/*CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

ALTER TABLE messages
ADD COLUMN item_id INTEGER NOT NULL REFERENCES items(item_id) ON DELETE CASCADE;

ALTER TABLE messages
ADD COLUMN read BOOLEAN DEFAULT FALSE;

ALTER TABLE messages
ADD COLUMN conversation_id INTEGER REFERENCES conversations(conversation_id) ON DELETE CASCADE;

ALTER TABLE messages
ADD COLUMN is_deleted_by_sender BOOLEAN DEFAULT FALSE;
ALTER TABLE messages
ADD COLUMN is_deleted_by_receiver BOOLEAN DEFAULT FALSE;
*/


/*
      const conversationId = messages[0].conversation_id;
      const conversationOwnerId = await db("conversations")
      .select("item_owner_id")
      .where("conversation_id", conversationId)
      .first();

      const user = await db("users")
        .select("user_id", "username")
        .where("user_id", conversationOwnerId.item_owner_id)
        .first();
*/ 