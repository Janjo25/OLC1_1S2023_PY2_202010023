import {Environment} from "../../environment";
import {Expression} from "../expression";
import {InterpreterSymbol} from "../../tables/symbols/interpreterSymbol";

class Identifier extends Expression {
    private readonly _identifier: string;

    constructor(identifier: string) {
        super();

        this._identifier = identifier;
    };

    getType(environment: Environment): number | void {
        const symbol: InterpreterSymbol | undefined = environment.getSymbol(this._identifier);

        return (symbol !== undefined) ? symbol.type : alert("No se puede obtener información del tipo.");
    };

    getValue(environment: Environment): boolean | number | string | void {
        const symbol: InterpreterSymbol | undefined = environment.getSymbol(this._identifier);

        return (symbol !== undefined) ? symbol.value : alert("No se puede obtener información del valor.");
    };
}

export {Identifier};
