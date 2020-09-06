import dotenv from 'dotenv';
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const REDIS_SERVER = process.env.REDIS_SERVER;

export {
    BOT_TOKEN,
    REDIS_SERVER,
};
