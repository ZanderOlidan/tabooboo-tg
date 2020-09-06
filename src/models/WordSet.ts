export class WordSet {
    public Taboos: string[] = [];
    public Answer: string;

    public constructor(object?: WordSet) {
        Object.assign(this, object);
    }
}