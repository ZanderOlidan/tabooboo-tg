import telegraf, { Telegraf } from 'telegraf';
import { createWordSet, showWordSetAction, checkWord } from './services/GameService';
import { SHOW_WORD_SET } from './ActionNames';
import { BOT_TOKEN, WEBHOOK_URL, WEBHOOK_PORT, WEBHOOK_ENDPOINT, SIGNED_CERT, ENVIRONMENT } from './EnvironmentVariables';
import { readFileSync } from 'fs';
try {
    const bot = new Telegraf(BOT_TOKEN);
    bot.use(Telegraf.log())


    bot.command('solo', createWordSet);
    bot.command('test', ctx => ctx.reply('lol'));

    bot.action(SHOW_WORD_SET, showWordSetAction);
    bot.on('text', checkWord);

    if (ENVIRONMENT.includes('dev')) {
        bot.telegram.setWebhook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);
        bot.startWebhook(WEBHOOK_ENDPOINT, {}, 8443);
    } else {
        bot.telegram.setWebhook(`${WEBHOOK_URL}/${WEBHOOK_ENDPOINT}/bot${BOT_TOKEN}`, {
            source: SIGNED_CERT,
        }, 100);
        bot.startWebhook(WEBHOOK_ENDPOINT, {
            ca: readFileSync(SIGNED_CERT),
        }, WEBHOOK_PORT, "127.0.0.1");
    }

} catch (e) {
    console.error(e);
}


// TODO:
// check button source
