class InterpreterError {
    private readonly _column: number;
    private readonly _description: string;
    private readonly _line: number;
    private readonly _type: string;

    constructor(type: string, description: string, line: number, column: number) {
        this._type = type;

        this._description = description;

        this._line = line;
        this._column = column;
    };

    getMessage() {
        const errorLocation = ", línea: " + this._line + ", columna: " + this._column;

        return "Error " + this._type + ": " + this._description + errorLocation;
    };
}

export {InterpreterError};
