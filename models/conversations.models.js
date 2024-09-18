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
export const _getAllUserConversations = async (user_id) => {
      try {
          const userConversations = await db('conversations')
          .select("*")
          .where(function() {
            this.where({ conversation_owner_id: user_id })
              .orWhere({ item_owner_id: user_id });
          })
          .andWhere(function() {
            this.where({ is_deleted_by_conversation_owner: false })
              .andWhere({ is_deleted_by_item_owner: false });
          });
          
          console.log(userConversations)
          return userConversations
      } catch (error) {
        throw new Error(`Error get all user conversations: ${error.message}`);
      }  

}*/

export const _deleteConversation = async (user_id, conversation_id) => {
  try {
    const conversationToDelete = await db('conversations')
      .select("*")
      .where({ conversation_id: conversation_id })
      .first();

    if (!conversationToDelete) {
      throw new Error('Conversation not found');
    }

    let updateData = {};
    if (conversationToDelete.conversation_owner_id === user_id) {
      updateData = { is_deleted_by_conversation_owner: true };
    } else if (conversationToDelete.item_owner_id === user_id){
      updateData = { is_deleted_by_item_owner: true };
    } else {
      throw new Error('User is not authorized to delete this conversation');
    }

    if (Object.keys(updateData).length > 0) {
      await db('conversations')
        .where({ conversation_id: conversation_id })
        .update(updateData);
    }

    const updatedConversation = await db('conversations')
      .select('is_deleted_by_conversation_owner', 'is_deleted_by_item_owner')
      .where({ conversation_id: conversation_id })
      .first();

    if (
      updatedConversation.is_deleted_by_conversation_owner === true &&
      updatedConversation.is_deleted_by_item_owner === true
    ) {
      await db('conversations')
        .where({ conversation_id: conversation_id })
        .update({ is_conversation_deleted: true });
    }

    const messagesToDelete = await db('messages')
      .select("*")
      .where({ conversation_id: conversation_id });

    if (messagesToDelete.length < 1) {
      throw new Error('No messages found for this conversation');
    }

    for (const message of messagesToDelete) {
      let updateMessagesData = {};
      if (message.sender_id === user_id) {
        updateMessagesData.is_deleted_by_sender = true;
      } else if (message.receiver_id === user_id) {
        updateMessagesData.is_deleted_by_receiver = true;
      } else {
        throw new Error("User is not authorized to delete this conversation's messages");
      }

      if (Object.keys(updateMessagesData).length > 0) {
        await db('messages')
          .where({ message_id: message.message_id })
          .update(updateMessagesData);
      }
    }

  } catch (error) {
    console.error(`Error deleting conversation: ${error.message}`);
    throw new Error(`Error deleting conversation: ${error.message}`);
  }
};

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

ALTER TABLE conversations
ADD COLUMN deleted_by_owner_of_conversation BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
ADD COLUMN deleted_by_owner_of_item BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
DROP COLUMN deleted_by_owner_of_conversation;

ALTER TABLE conversations
DROP COLUMN deleted_by_owner_of_item;

ALTER TABLE conversations
ADD COLUMN is_deleted_by_owner_of_conversation BOOLEAN DEFAULT FALSE,
ADD COLUMN is_deleted_by_owner_of_item BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
DROP COLUMN is_deleted_by_receiver;

ALTER TABLE conversations
DROP COLUMN is_deleted_by_sender;

ALTER TABLE conversations
ADD COLUMN is_deleted_by_conversation_owner BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
ADD COLUMN is_deleted_by_item_owner BOOLEAN DEFAULT FALSE;

ALTER TABLE conversations
ADD COLUMN is_conversation_deleted BOOLEAN DEFAULT FALSE;

*/

