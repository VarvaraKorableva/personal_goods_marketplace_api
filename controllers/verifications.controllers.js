import nodemailer from'nodemailer'
import { _saveVerificationCode, _getVerificationCode } from '../models/verifications.models.js'
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await _saveVerificationCode(email, verificationCode);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    });
    res.status(200).json({ msg: 'Verification code sent.' })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error sending verification code.');
  }
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const verification = await _getVerificationCode(email, code);
    if (verification.length) {
      res.json({ msg: "Code verified. You can now complete registration." })
    } else {
      res.json({ msg: "Invalid or expired verification code." })
    }
  } catch (error) {
    res.json({ msg: "Error verifying code." })
  }
};
