import { TelegrafContext } from "telegraf/typings/context";
import { SHOW_WORD_SET } from "../ActionNames";
import { Extra } from "telegraf";
import { getWordSet, isWordExist, deleteWord } from "./WordFetcherService";
import { WordType } from "../models/WordTypeEnum";


const currentPlayer = {};

const showWordSetAction = async (ctx: TelegrafContext) => {
    if (currentPlayer?.[ctx.chat.id]?.[ctx.from.id]) {
        const wordSet = await getWordSet(ctx.chat.id, ctx.from.id);
        await ctx.answerCbQuery(`${wordSet.Answer}\n\nDo NOT mention these words:\n${wordSet.Taboos.reduce((a, w) => '- ' + w + '\n' + a, '')}`, true)
        return;
    }
    await ctx.answerCbQuery(`You're not the guessee.`);
};

const checkWord = async (ctx: TelegrafContext) => {
    const exists = isWordExist(ctx.chat.id, ctx.message.text.toUpperCase());
    if (exists) {
        if (exists.type === WordType.Answer) {
            deleteWord(ctx.chat.id, exists.userId);
            delete currentPlayer[ctx.chat.id][ctx.from.id];
            await ctx.replyWithMarkdown("⭕ CORRECT!", {
                reply_to_message_id: ctx.message.message_id
            });
            return;
        }
        if (ctx.from.id === exists.userId) {
            await ctx.replyWithHTML(`<b>😡 TABOO!</b>`, {
                reply_to_message_id: ctx.message.message_id
            });
        }
    }
};

const createWordSet = (ctx: TelegrafContext) => {
    currentPlayer[ctx.chat.id] = {
        ...currentPlayer[ctx.chat.id],
        [ctx.from.id]: `${ctx.from.first_name} ${ctx.from.last_name}`
    }
    return ctx.reply(`${ctx.from.first_name}'s word`, Extra.HTML()
        .markup((m) =>
            m.inlineKeyboard([
            m.callbackButton('𝗦𝗛𝗢𝗪', SHOW_WORD_SET),
        ])));
};


export {
    createWordSet,
    showWordSetAction,
    checkWord
}
