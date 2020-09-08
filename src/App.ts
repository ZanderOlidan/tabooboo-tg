import telegraf, { Telegraf, Extra, Markup } from 'telegraf';
import { createWordSet, showWordSetAction, checkWord } from './services/GameService';
import { CREATE_WORD_SET, SHOW_WORD_SET } from './ActionNames';
import { BOT_TOKEN, WEBHOOK_URL, WEBHOOK_PORT, WEBHOOK_ENDPOINT, SIGNED_CERT } from './EnvironmentVariables';
import * as fastify from 'fastify';



try {
    const bot = new Telegraf(BOT_TOKEN);
    bot.use(Telegraf.log())
    // bot.telegram.setWebhook(WEBHOOK_URL);


    bot.command('solo', createWordSet);
    bot.command('test', ctx => ctx.reply('lol'));

    bot.action(SHOW_WORD_SET, showWordSetAction);
    bot.on('text', checkWord);


    // bot.startWebhook(WEBHOOK_ENDPOINT, null, WEBHOOK_PORT);
    bot.launch({
        webhook: {
            port: WEBHOOK_PORT,
            domain: WEBHOOK_URL,
            host: "127.0.0.1",
            hookPath: WEBHOOK_ENDPOINT,
            tlsOptions: {
                cert: SIGNED_CERT
            }
        }
    });
} catch (e) {
    console.error(e);
}


// TODO:
// check button source
