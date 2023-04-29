import {Environment} from "../../environment";
import {Operation} from "../../expressions/operation/operation";
import {Statement} from "../statement";
import {Variable} from "../../expressions/declaration-assignment/variable";
import {output} from "../../output/output";

class Print extends Statement {
    private _expression: Operation | Variable;

    constructor(expression: Operation | Variable) {
        super();

        this._expression = expression;
    };

    execute(environment: Environment): void {
        output.append("-> " + this._expression.getValue(environment) + '\n');
    };
}

export {Print};
