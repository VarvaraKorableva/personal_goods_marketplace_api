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
//get all messages with one user about one item - getAllMessagesWithOneUserAboutOneItem getOneConversation
export const _getOneConversation = async (receiver_id, sender_id, item_id) => {
  try {
      const result = await db("messages")
      .select("*")
      .where({ receiver_id, sender_id, item_id })
      .orWhere({ receiver_id: sender_id, sender_id: receiver_id, item_id: item_id })
      .orderBy("timestamp", "asc");

      return result
  } catch (error) {
      throw new Error(`Error in messages.models: ${error.message}`);
  }
};
//get last message from every conversation
/*export const _getLastMessageFromEveryConversation = async (user_id) => {
    try {
        const result = await db("messages")
        .select("*")
        .where({ receiver_id : user_id })
        .orWhere({ sender_id: user_id })
        .orderBy("timestamp", "asc");

        return result
    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
};*/

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

        // Основной запрос для получения полных данных последних сообщений
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
            .select("messages.*")
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



  //delete only my messages
export const _deleteMessage = (message_id) => {
    return db("messages").delete("*").where({ message_id })
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