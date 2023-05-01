import {Environment} from "../../environment";
import {Expression} from "../expression";
import {InterpreterSymbol} from "../../tables/symbols/interpreterSymbol";
import {Operation} from "../operation/operation";
import {Statement} from "../../statements/statement";
import {Variable} from "./variable";

class Assignment extends Statement {
    private readonly _column: number;
    private readonly _line: number;
    private readonly _name: string;
    private readonly _value: Expression;

    constructor(name: string, value: Expression, line: number, column: number) {
        super();

        this._name = name;

        this._value = value;

        this._line = line;
        this._column = column;
    };

    execute(environment: Environment): boolean | number | string | undefined {
        const type: number = environment.getSymbol(this._name)!.type;

        const expression: Expression = this._value;

        let value: boolean | number | string | undefined;

        if (expression instanceof Operation) {
            value = expression.getValue(environment);
        } else if (expression instanceof Variable) {
            value = expression.getValue(environment);
        }

        const symbol: InterpreterSymbol = new InterpreterSymbol(type, this._name, value!, this._line, this._column);

        environment.setSymbol(this._name, symbol);

        return value;
    };
}

export {Assignment};
