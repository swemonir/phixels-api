import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  // Server
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,

  // Node Environment
  NODE_ENV: process.env.NODE_ENV,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,

  // NodeMailer
  NODE_MILER_USER: process.env.NODE_MILER_USER,
  NODE_MILER_PASS: process.env.NODE_MILER_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
