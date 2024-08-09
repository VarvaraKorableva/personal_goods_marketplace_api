import { db } from "../config/pg.config.js"

export const _createMessages = async (sender_id, receiver_id, message_text, item_id) => {
  try {
    const result = await db("messages").insert({
        sender_id,
        receiver_id,
        message_text,
        item_id,
    }).returning("*");

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
      // Определяем ID пользователя, с которым переписываемся
      const otherUserId = messages[0].sender_id === my_user_id ? messages[0].sender_id: messages[0].receiver_id;
      // Получаем информацию о пользователе
      const user = await db("users")
        .select("*")
        .where("user_id", otherUserId)
        .first();
  
      return { messages, user };
    } catch (error) {
      throw new Error(`Error in messages.models: ${error.message}`);
    }
  };

export const _getLastMessageFromEveryConversation = async (user_id) => {
    try {
        // Подзапрос для нахождения последних сообщений для каждой комбинации (item, sender и receiver)
        const lastMessagesSubquery = db("messages")
            .select("item_id", "sender_id", "receiver_id")
            .max("timestamp as max_timestamp")
            .where(function() {
                this.where({ receiver_id: user_id }).orWhere({ sender_id: user_id });
            })
            .groupBy("item_id", "sender_id", "receiver_id");

        // Основной запрос для получения полных данных последних сообщений, информации о пользователе, предмете и фотографиях
        const result = await db("messages")
            .join(
                db.raw(`(${lastMessagesSubquery.toString()}) as last_messages`),
                function() {
                    this.on("messages.item_id", "last_messages.item_id")
                        .andOn("messages.sender_id", "last_messages.sender_id")
                        .andOn("messages.receiver_id", "last_messages.receiver_id")
                        .andOn("messages.timestamp", "last_messages.max_timestamp");
                }
            )
            .join("users as sender", "messages.sender_id", "sender.user_id")
            .join("users as receiver", "messages.receiver_id", "receiver.user_id")
            .join("items", "messages.item_id", "items.item_id")
            .leftJoin("uploads", "items.item_id", "uploads.item_id") // Left join with uploads table
            .select(
                "messages.*",
                "sender.username as sender_username",
                "sender.email as sender_email",
                "receiver.username as receiver_username",
                "items.title as item_title",
                "items.price as item_price",
                "items.owner_id as item_owner_id",
                "uploads.location as image_location",
            )
            .orderBy("messages.timestamp", "asc");

        // Постобработка для удаления дублирующихся сообщений
        const uniqueMessages = result.reduce((acc, message) => {
            const key = `${message.item_id}-${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}`;
            if (!acc.has(key)) {
                acc.set(key, message);
            }
            return acc;
        }, new Map());

        return Array.from(uniqueMessages.values());

    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
};

export const _deleteMessage = (message_id) => {
    return db("messages").delete("*").where({ message_id })
};

  export const _markMessagesAsRead = async (receiver_id, sender_id, item_id, user_id) => {
    try {
        const result = await db("messages")
        .select("*")
        .where({ receiver_id, sender_id, item_id })
        .orWhere({ receiver_id: sender_id, sender_id: receiver_id, item_id: item_id })
        .andWhere({ receiver_id: user_id }) // Условие, чтобы обновлять только если receiver_id совпадает с user_id
        .update({ read: true });
  
        return result
    } catch (error) {
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
*/