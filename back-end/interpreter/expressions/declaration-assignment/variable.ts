import {Environment} from "../../environment";
import {Expression} from "../expression";

class Variable extends Expression {
    private readonly type: number; // Si una variable es "readonly" solo se podrá modificar una vez.
    private readonly value: number | string;

    constructor(type: number, value: number | string) {
        super();

        this.type = type;
        this.value = value;
    };

    getType(environment: Environment): number {
        return this.type;
    };

    getValue(environment: Environment): number | string {
        return this.value;
    };
}

export {Variable};
