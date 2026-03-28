import dotenv from 'dotenv';

dotenv.config();

const parseOrigins = (raw) =>
  String(raw || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/my_app',
  jwtSecret: process.env.JWT_SECRET || 'dev-insecure-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 200),
  uploadMaxMb: Number(process.env.UPLOAD_MAX_MB || 5),
  nodeEnv: process.env.NODE_ENV || 'development',
};

