import { db } from "../config/pg.config.js"

export const _createConversation = async (sender_id, receiver_id, item_id) => {
    try {
      const existingConversations = await db("conversations")
        .select("*")
        .where({ receiver_id, sender_id, item_id })
        .orWhere({ receiver_id: sender_id, sender_id: receiver_id, item_id });
  
      if (existingConversations.length > 0) {
        return existingConversations[0];
      } else {

        const newConversation = await db("conversations")
          .insert({
            sender_id,
            receiver_id,
            item_id
          })
          .returning("*");
        
        return newConversation[0];
      }
    } catch (error) {
       throw new Error(`Error creating conversation: ${error.message}`);
    }
  };  

  export const _getAllUserConversations = async (user_id) => {
      try {
          const userConversations = await db('conversations')
          .select("*")
          .where({receiver_id: user_id })
          .orWhere({ sender_id: user_id})
          console.log(userConversations)
          return userConversations
      } catch (error) {
        throw new Error(`Error creating conversation: ${error.message}`);
      }  

  }

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

/*
CREATE TABLE conversations (
    conversation_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    item_id INTEGER,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);


ALTER TABLE conversations
ADD COLUMN is_deleted_by_sender BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
ADD COLUMN is_deleted_by_receiver BOOLEAN DEFAULT FALSE;
*/

