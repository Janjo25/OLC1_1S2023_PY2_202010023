class InterpreterError {
    private readonly _column: number;
    private readonly _line: number;
    private readonly _token: string;
    private readonly _type: string;

    constructor(type: string, token: string, line: number, column: number) {
        this._type = type;

        this._token = token;

        this._line = line;
        this._column = column;
    };

    getMessage() {
        const errorLocation = ", línea: " + this._line + ", columna: " + this._column;

        return "Error " + this._type + ": " + this._token + errorLocation;
    };
}

export {InterpreterError};
