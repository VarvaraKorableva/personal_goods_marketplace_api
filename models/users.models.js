import { db } from "../config/pg.config.js"
import bcrypt from 'bcrypt'

export const _createUser = async (username, email, password, phone) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await db("users").insert({
        username,
        email,
        password: hashedPassword,
        phone
      }).returning("*");
  
      return result[0];
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
};

export const _getUserByEmail = (email) => {
  return db("users").select("*").where({ email })
};

export const _getUserById = (user_id) => {
  return db("users").select("*").where({ user_id })
};

export const _getAllUsers = () => {
  return db("users").select("*").orderBy("user_id");
};

export const _deleteUser = (user_id) => {
  return db("users").delete("*").where({ user_id })
};
