import nodemailer from'nodemailer'
import { _saveVerificationCode, _getVerificationCode } from '../models/verifications.models.js'

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await _saveVerificationCode(email, verificationCode);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Verification code sent.');
  } catch (error) {
    res.status(500).send('Error sending verification code.');
  }
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const verification = await _getVerificationCode(email, code);

    if (verification) {
      res.status(200).send('Code verified. You can now complete registration.');
    } else {
      res.status(400).send('Invalid or expired verification code.');
    }
  } catch (error) {
    res.status(500).send('Error verifying code.');
  }
};
