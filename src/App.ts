import telegraf, { Telegraf, Extra, Markup } from 'telegraf';
import { createWordSet, showWordSetAction, checkWord } from './services/GameService';
import { CREATE_WORD_SET, SHOW_WORD_SET } from './ActionNames';
import { BOT_TOKEN, WEBHOOK_URL, WEBHOOK_PORT, WEBHOOK_ENDPOINT } from './EnvironmentVariables';
import * as fastify from 'fastify';


const bot = new Telegraf(BOT_TOKEN);
bot.use(Telegraf.log())
bot.telegram.setWebhook(WEBHOOK_URL);


bot.command('solo', createWordSet);
bot.command('test', ctx => ctx.reply('lol'));

bot.action(SHOW_WORD_SET, showWordSetAction);
bot.on('text', checkWord);


bot.startWebhook(WEBHOOK_ENDPOINT, null, WEBHOOK_PORT);
// bot.launch();


// TODO:
// check button source