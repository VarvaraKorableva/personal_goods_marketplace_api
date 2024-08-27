import { db } from "../config/pg.config.js"
//conversation_owner_id -  who started conversation
export const _createConversation = async (conversation_owner_id, item_owner_id, item_id) => {
    try {
      const result = await db("conversations")
      .select("*")
      .where({ conversation_owner_id, item_owner_id, item_id })
      if(result.length) {
        return result[0];
      } else {
        const newConversation = await db("conversations")
        .insert({
          conversation_owner_id, item_owner_id, item_id
        })
        .returning("*");
        return newConversation[0];
      }
    } catch (error) {
       throw new Error(`Error creating conversation: ${error.message}`);
    }
};  
/*
export const _getLastMessagesForUser = async (user_id) => {
  try {
    // Подзапрос для нахождения последних сообщений для каждой беседы, в которой пользователь является владельцем
    const lastMessagesSubquery = db("messages")
      .select("m.conversation_id", "m.message_text", "m.created_at")
      .max("m.created_at as max_created_at")
      .from("messages as m")
      .join("conversations as c", "m.conversation_id", "c.conversation_id")
      .where(function() {
        this.where("c.conversation_owner_id", user_id)
            .orWhere("c.item_owner_id", user_id);
      })
      .groupBy("m.conversation_id");

    // Основной запрос для получения полных данных последних сообщений и информации о пользователе
    const result = await db("messages as m")
      .join(
        db.raw(`(${lastMessagesSubquery.toString()}) as last_messages`),
        function() {
          this.on("m.conversation_id", "last_messages.conversation_id")
              .andOn("m.created_at", "last_messages.max_created_at");
        }
      )
      .join("conversations as c", "m.conversation_id", "c.conversation_id")
      .join("users as owner", function() {
        this.on("c.conversation_owner_id", "owner.user_id");
      })
      .join("users as item_owner", function() {
        this.on("c.item_owner_id", "item_owner.user_id");
      })
      .select(
        "m.conversation_id",
        "m.message_text as last_message", // Обновите имя поля
        "m.created_at as last_message_time",
        "owner.username as owner_username",
        "item_owner.username as item_owner_username"
      );

    return result;
  } catch (error) {
    throw new Error(`Error fetching last messages for user: ${error.message}`);
  }
};
*/

  export const _getAllUserConversations = async (user_id) => {
      try {
          const userConversations = await db('conversations')
          .select("*")
          .where({ conversation_owner_id: user_id })
          .orWhere({ item_owner_id: user_id})
          
          return userConversations
      } catch (error) {
        throw new Error(`Error creating conversation: ${error.message}`);
      }  

  }
/*
//если один удалил то другому придет сообщение, что юзер удалил конверсейшен и если он отправить сообщение, то юзер его не увидит
  export const _deleteConversationById = async (conversation_id, user_id) => {
    try {
  
      const conversation = await db("conversations")
        .select("sender_id", "receiver_id", "is_deleted_by_sender", "is_deleted_by_receiver")
        .where({ conversation_id })
        .first();
      
      if (!conversation) {
        throw new Error("Conversation not found");
      }
  
      let updateFields = {};
  
      if (conversation.sender_id === user_id) {
    
        updateFields = { is_deleted_by_sender: true };
      } else if (conversation.receiver_id === user_id) {
   
        updateFields = { is_deleted_by_receiver: true };
      } else {
        throw new Error("User is not part of the conversation");
      }
  
  
      await db("conversations")
        .where({ conversation_id })
        .update(updateFields);
 
      const updatedConversation = await db("conversations")
        .select("is_deleted_by_sender", "is_deleted_by_receiver")
        .where({ conversation_id })
        .first();
  
      if (updatedConversation.is_deleted_by_sender && updatedConversation.is_deleted_by_receiver) {

        await db("messages")
        .where({ conversation_id })
        .del();
  
        await db("conversations")
          .where({ conversation_id })
          .del();
        
        return { message: 'Conversation deleted from database' };
      }
  
      return { message: 'Conversation updated' };
    } catch (error) {
      throw new Error(`Error deleting conversation: ${error.message}`);
    }
  };
*/
/*
CREATE TABLE conversations (
    conversation_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    conversation_owner_id INTEGER NOT NULL,
    item_owner_id INTEGER NOT NULL,
    item_id INTEGER,
    is_deleted_by_sender BOOLEAN DEFAULT FALSE,
    is_deleted_by_receiver BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (conversation_owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

*/

