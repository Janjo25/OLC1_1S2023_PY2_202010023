import {InterpreterError} from "./interpreterError";

class InterpreterErrorsList {
    private _errorsArray: InterpreterError[];

    constructor() {
        this._errorsArray = [];
    };

    getError(index: number): InterpreterError {
        return this._errorsArray[index];
    };

    getLength(): number {
        return this._errorsArray.length;
    };

    pushError(type: string, token: string, line: number, column: number): void {
        this._errorsArray.push(new InterpreterError(type, token, line, column));
    };

    reset(): void {
        this._errorsArray = [];
    };
}

const interpreterErrorsList = new InterpreterErrorsList();

export {interpreterErrorsList};
