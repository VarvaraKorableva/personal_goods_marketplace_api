import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

import {
  _createUser,
  _getAllUsers,
  _getUserByEmail,
  _deleteUser,
  _getUserById,
 // _adCountIncrement,
 // _adCountDecrement,
  _updatePassword,
  _updateTelegram,

} from "../models/users.models.js"

const {JWT_SECRET} = process.env;

export const createUser = async (req, res) => {
  const { username, email, password, telegram, } = req.body;
  try {
    const data = await _createUser(username, email, password, telegram,);
    const token = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '7d' });
    const user = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      telegram: data.telegram,
    };
    return res
      .cookie('jwt', token, { httpOnly: true, sameSite: true })
      .json({ token, user });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.message === "Email is already registered") {
      return res.status(400).json({ msg: "Email is already registered" });
    }
    return res.status(500).json({ msg: "Error, you are not registered, try again" });
  }
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
    const { user_id } = req.params
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

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('jwt');
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await _getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    delete user.password;
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res
      .cookie('jwt', token, { httpOnly: true, sameSite: true })
      .json({ token, user });

  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/*
export const adCountIncrement = (req, res) => {
  const { user_id } = req.params
  
  _adCountIncrement(user_id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};


export const adCountDecrement = (req, res) => {
  const { user_id } = req.params
  
  _adCountDecrement(user_id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};*/

export const updatePassword = (req, res) => {
  const { email, newPassword } = req.body;

  _updatePassword(email.email, email.newPassword)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(404).json({ msg: "Not Found" });
      });
};

export const updateTelegram = (req, res) => {
  const {user_id, telegram } = req.body;
  //const { user_id } = req.params;
  _updateTelegram(user_id, telegram)
    .then((updatedTelegram) => {
      if (updatedTelegram) {
        res.json({ msg: "Successfully updated", user: updatedTelegram });
      } else {
        res.status(404).json({ msg: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating Telegram:", err);
      res.status(500).json({ msg: "Error, try again" });
    });
};