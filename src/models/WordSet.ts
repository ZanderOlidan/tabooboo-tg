export class WordSet {
    public Taboos: string[] = [];
    public Answer: string;
    public UserId: number;

    public constructor(object?: WordSet) {
        Object.assign(this, object);
    }
}