import { db } from "../config/pg.config.js"

export const _createMessages = async (sender_id, receiver_id, message_text, item_id) => {
  try {
    const result = await db("messages").insert({
        sender_id,
        receiver_id,
        message_text,
        item_id
    }).returning("*");

    return result[0];
  }catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const _getAllUserMessages = async (receiver_id, sender_id) => {
    try {
        const result = await db("messages")
        .select("*")
        .where({ receiver_id, sender_id })
        .orWhere({ receiver_id: sender_id, sender_id: receiver_id })
        .orderBy("timestamp", "asc");

        return result
    } catch (error) {
        throw new Error(`Error in messages.models: ${error.message}`);
    }
};
  
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
*/