import got from 'got';
import htmlParser from 'node-html-parser';
import dayjs from 'dayjs';
import { WordSet } from '../models/WordSet';
import { WordType } from '../models/WordTypeEnum';

interface IWordOption {
    [groupId: number]: {
        [word: string]: number
    }
}
interface IGroupWordSet {
    [groupId: number]: {
        [userId: number]: WordSet
    }
}
const wordSets: IGroupWordSet = {};
const tabooList: IWordOption = {};
const answerList: IWordOption = {};

const fetchWordSetRequest = async () => {
    try {
        const rawWordSet = await got(`https://playtaboo.com/ajax/v1/next?${dayjs().valueOf()}`);
        const parsedWordSet = htmlParser(rawWordSet.body);
        const taboos = parsedWordSet.querySelectorAll('li');

        return new WordSet({
            Answer: parsedWordSet.querySelector('h2').rawText,
            Taboos: taboos.map(w => w.rawText),
        });
    } catch (e) {
        console.error(e);
    }
};

const fetchAndStoreWordSet = async (userGroup: number, userId: number) => {
    const wordset = await fetchWordSetRequest();
    wordSets[userGroup] = {
        [userId]: wordset
    };
    const reduceFn = (a: { [x: string]: number; }, w: string) => {
        a[w] = userId;
        return a;
    };
    tabooList[userGroup] = {
        ...tabooList[userGroup],
        ...wordset.Taboos.reduce(reduceFn,{}),
    };

    answerList[userGroup] = {
        ...answerList[userGroup],
        [wordset.Answer]: userId,
    };
    return wordset;
}

const getWordSet = async (userGroup: number, userId: number): Promise<WordSet> => {
    const stored = wordSets?.[userGroup]?.[userId];
    if (stored) {
        return stored;
    } else {
        return fetchAndStoreWordSet(userGroup, userId);
    }
};

const isWordExist = (userGroup: number, word: string) => {
    const isTaboo = tabooList?.[userGroup]?.[word];
    if (isTaboo) {
        return {
            type: WordType.Taboo,
            userId: isTaboo
        };
    }

    const isAnswer = answerList?.[userGroup]?.[word];
    if (isAnswer) {
        return {
            type: WordType.Answer,
            userId: isAnswer
        }
    }

    return null;
};

const deleteWord = (userGroup: number, userId: number) => {
    const wordSet = wordSets[userGroup][userId];
    if (wordSet) {
        wordSet.Taboos.forEach(w => {
            delete tabooList[userGroup][w];
        });
        delete answerList[userGroup][wordSet.Answer]
        delete wordSets[userGroup][userId];
    }
}

export {
    fetchWordSetRequest,
    getWordSet,
    isWordExist,
    deleteWord
}
