import dotenv from 'dotenv';
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const REDIS_SERVER = process.env.REDIS_SERVER;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

export {
    BOT_TOKEN,
    REDIS_SERVER,
    WEBHOOK_URL
};
