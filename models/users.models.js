import { db } from "../config/pg.config.js"
import bcrypt from 'bcrypt'

export const _createUser = async (username, email, password) => {
    try {
      const existingUser = await db("users").where({ email }).first();
        if (existingUser) {
          throw new Error("Email is already registered");
        } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db("users").insert({
          username,
          email,
          password: hashedPassword
        }).returning("*");
  
        return result[0];
      }} 
      catch (error) {
        throw new Error(`${error.message}`);
      } 
};

export const _getUserByEmail = async (email) => {
  try {
    const user = await db("users").select("*").where({ email }).first();
    return user;
  } catch (error) {
    throw error;
  }
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


/*
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE users
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE users
ALTER COLUMN phone DROP NOT NULL;
*/