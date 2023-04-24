import {StringBuilder} from "../../utils/StringBuilder";

class Output {
    private readonly _stringBuilder: StringBuilder;

    constructor() {
        this._stringBuilder = new StringBuilder();
    };

    get stringBuilder(): StringBuilder {
        return this._stringBuilder;
    };

    append(text: string): void {
        this._stringBuilder.append(text);
    };

    reset(): void {
        this._stringBuilder.reset();
    };
}

const output = new Output();

export {output};
