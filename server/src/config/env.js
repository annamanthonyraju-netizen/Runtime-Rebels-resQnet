import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/resqnet',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_resqnet_jwt_key_2026_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'super_secret_resqnet_refresh_key_2026',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'resqnet-cloud',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '123456789012345',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'super_secret_cloudinary_key',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
