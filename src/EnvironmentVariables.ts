import dotenv from 'dotenv';
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const REDIS_SERVER = process.env.REDIS_SERVER;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const WEBHOOK_PORT = process.env.WEBHOOK_PORT ? parseInt(process.env.WEBHOOK_PORT, 10) : 8443;
const WEBHOOK_ENDPOINT = process.env.WEBHOOK_ENDPOINT;
const SIGNED_CERT = process.env.SIGNED_CERT;

export {
    BOT_TOKEN,
    REDIS_SERVER,
    WEBHOOK_URL,
    WEBHOOK_PORT,
    WEBHOOK_ENDPOINT,
    SIGNED_CERT
};
