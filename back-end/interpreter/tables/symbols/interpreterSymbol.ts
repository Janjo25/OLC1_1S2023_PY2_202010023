class InterpreterSymbol {
    private readonly _name: string;
    private readonly _type: number;
    private readonly _value: null | number;

    constructor(type: number, name: string, value: null | number) {
        this._type = type;

        this._name = name;

        this._value = value;
    };

    get name(): string {
        return this._name;
    };

    get type(): number {
        return this._type;
    };

    get value(): null | number {
        return this._value;
    };
}

export {InterpreterSymbol};
