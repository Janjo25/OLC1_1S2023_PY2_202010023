import {DeclarationType} from "./declarationType";
import {Environment} from "../../environment";
import {Expression} from "../expression";
import {InterpreterSymbol} from "../../tables/symbols/interpreterSymbol";
import {Operation} from "../operation/operation";
import {Statement} from "../../statements/statement";
import {Variable} from "./variable";

class Declaration extends Statement {
    private _value: Expression | undefined;

    private readonly _column: number;
    private readonly _line: number;
    private readonly _name: string;
    private readonly _type: number;

    constructor(type: number, name: string, line: number, column: number) {
        super();

        this._type = type;

        this._name = name;

        this._line = line;
        this._column = column;

        this._value = undefined;
    };

    execute(environment: Environment): boolean | number | string | undefined {
        if (this._value instanceof Expression) {
            const expression: Expression = this._value;

            let value!: boolean | number | string | undefined;

            if (expression instanceof Operation) {
                value = expression.getValue(environment);
            } else if (expression instanceof Variable) {
                value = expression.getValue(environment);
            }

            const type: number = this._type;
            const name: string = this._name;
            const line: number = this._line;
            const column: number = this._column;

            const symbol: InterpreterSymbol = new InterpreterSymbol(type, name, value!, line, column);

            environment.appendSymbol(this._name, symbol);

            return value;
        } else {
            const value: number | string | boolean | undefined = this.getDefaultValue();

            const type: number = this._type;
            const name: string = this._name;
            const line: number = this._line;
            const column: number = this._column;

            const symbol: InterpreterSymbol = new InterpreterSymbol(type, name, value!, line, column);

            environment.appendSymbol(this._name, symbol);

            return value;
        }
    };

    getDefaultValue(): boolean | number | string | undefined {
        switch (this._type) {
            case DeclarationType.BOOLEAN:
                return true;
            case DeclarationType.CHAR:
                return '';
            case DeclarationType.DOUBLE:
                return 0;
            case DeclarationType.INT:
                return 0;
            case DeclarationType.STRING:
                return "";
            default:
                return; // Este caso nunca se ejecutará.
        }
    };

    setValue(value: Expression): void { // No se puede usar un "setter", ya que no se hace instancia en el analizador.
        this._value = value;
    };
}

export {Declaration};
