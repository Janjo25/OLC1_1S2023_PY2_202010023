class InterpreterSymbol {
    private readonly _column: number;
    private readonly _line: number;
    private readonly _name: string;
    private readonly _type: number;
    private readonly _value: boolean | number | string;

    constructor(type: number, name: string, value: boolean | number | string, line: number, column: number) {
        this._type = type;

        this._name = name;

        this._value = value;

        this._line = line;
        this._column = column;
    };

    get column(): number {
        return this._column;
    };

    get line(): number {
        return this._line;
    };

    get name(): string {
        return this._name;
    };

    get type(): number {
        return this._type;
    };

    get value(): boolean | number | string {
        return this._value;
    };
}

export {InterpreterSymbol};
