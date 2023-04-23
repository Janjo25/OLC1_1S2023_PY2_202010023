class StringBuilder {
    private _value: string;

    constructor(initialValue?: string) {
        /*El signo de interrogación se usa para indicar que el parámetro es opcional.
        * 1. El lado derecho de los signos de interrogación es el valor que se asignará si el parámetro es nulo.*/
        this._value = initialValue ?? ""; // 1.
    };

    append(str: string): void {
        this._value += str;
    };

    reset(): void {
        this._value = "";
    };

    toString(): string {
        return this._value;
    };
}

export {StringBuilder};
