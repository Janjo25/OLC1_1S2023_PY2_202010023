import {Expression} from "../expression";

class Variable extends Expression {
    private readonly type: number; // Si una variable es "readonly" solo se podrá modificar una vez.
    private readonly value: number | string;

    constructor(type: number, value: number | string) {
        super();

        this.type = type;
        this.value = value;
    };

    getType(): number {
        return this.type;
    };

    getValue(): number | string {
        return this.value;
    };
}

export {Variable};
