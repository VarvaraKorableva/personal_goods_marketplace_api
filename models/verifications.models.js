/*CREATE TABLE email_verifications (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL GENERATED ALWAYS AS (created_at + INTERVAL '15 minutes') STORED
);*/

import { db } from "../config/pg.config.js"

export const _saveVerificationCode = async (email, code) => {
    const [newVerification] = await db('email_verifications')
      .insert({ email, verification_code: code })
      .returning('*');
    return newVerification;
  };
  
  export  const _getVerificationCode = async (email, code) => {
    try {
      const now = new Date().toISOString();
      const verification = await db('email_verifications')
      .select("*")
      .where({ email, verification_code: code })
      .andWhere('expires_at', '>', now)
      return verification
    } catch (error) {
      throw error
    }
  }

  export const _deleteVerificationCode = async (email) => {
    try {
      const deleted = await db('email_verifications')
        .where({ email })
        .del();

        return deleted

    } catch (error) {
      throw error;
    }
  };