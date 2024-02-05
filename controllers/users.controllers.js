import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

import {
  _createUser,
  _getAllUsers,
  _getUserByEmail,
  _deleteUser,
  _getUserById
} from "../models/users.models.js"

const {JWT_SECRET} = process.env;

export const createUser = (req, res) => {
    const { username, email, password, phone } = req.body;
    _createUser(username, email, password, phone)
      .then((data) => {
        res.json({ msg: "Successfully registered" });
      })
      .catch((err) => {
        res.status(404).json({ msg: "Error, you are not registered, try again" });
      });
};

export const getAllUsers = (req, res) => {
    _getAllUsers()
      .then((data) => {
        data.forEach((item)=>{
          delete item.password
        })
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};

export const getUser = async (req, res) => {
    const { user_id } = req.body
    try {
      const data = await _getUserById(user_id);
      if (data.length === 0) {
        return res.status(404).json({ msg: "User not found" })
      } else {
        delete data[0].password
        res.status(200).json(data)
      }
    } catch (error) {
      return res.status(404).json({ msg: "User not found" });
    }
}; 

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await _getUserByEmail(email);
      console.log(user)
      console.log(user[0].password)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Password or email is not correct" })
      } else {
        delete user[0].password
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, user})
      }
    } catch (error) {
      throw error;
    }
  };
  
export const deleteUser = (req, res) => {
  const user_id = req.body
  _deleteUser(user_id.user_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).json({ msg: "Not Found" });
    });
};
