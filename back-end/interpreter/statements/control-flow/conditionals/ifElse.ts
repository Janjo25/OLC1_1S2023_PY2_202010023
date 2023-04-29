import {Environment} from "../../../environment";
import {Expression} from "../../../expressions/expression";
import {Operation} from "../../../expressions/operation/operation";
import {Statement} from "../../statement";

class IfElse extends Statement {
    private _elseStatementsArrays: Statement[][];

    private readonly _conditionsArray: Expression[];
    private readonly _ifElseStatementsArrays: Statement[][];

    constructor(conditionsArray: Expression[], ifElseStatementsArrays: Statement[][]) {
        super();

        this._conditionsArray = conditionsArray;

        this._ifElseStatementsArrays = ifElseStatementsArrays;

        this._elseStatementsArrays = [];
    };

    else(elseStatementsArrays: Statement[][]): void {
        this._elseStatementsArrays = elseStatementsArrays;
    };

    elseIf(condition: Expression, ifElseStatementsArray: Statement[]): void {
        this._conditionsArray.push(condition);

        this._ifElseStatementsArrays.push(ifElseStatementsArray);
    };

    execute(environment: Environment): void {
        for (let i = 0; i < this._conditionsArray.length; i++) {
            /*1. El arreglo "_conditionsArray" acepta a las clases que hereden la clase abstracta "Expression".
            * Esto puede causar ciertos problemas cuando se desee usar un método sobrescrito de estas clases.
            * Para evitar este tipo de errores, es necesario aclarar la clase a la cual pertenece el método sobrescrito.
            * 2. El primer arreglo representa la sentencia conditional actual (la cuál es verdadera).
            * El primer arreglo representa las sentencias que serán ejecutadas.
            * 3. Cuando se llega a la última sentencia conditional se revisa si existe un "else" luego de esta.*/
            const expression: Expression = this._conditionsArray[i];

            let result: boolean | number | string | undefined;

            if (expression instanceof Operation) { // 1.
                result = expression.getValue(environment);
            }

            if (result) {
                const name: string = "Sentencia conditional-if";

                const localEnvironment: Environment = new Environment(name, environment, environment.global);

                for (let j = 0; j < this._ifElseStatementsArrays[i].length; j++) {
                    const statement: Statement = this._ifElseStatementsArrays[i][j]; // 2.

                    statement.execute(localEnvironment);
                }

                return;
            } else if (i == this._conditionsArray.length - 1) { // 3.
                if (this._elseStatementsArrays !== undefined) {
                    const name: string = "Sentencia conditional-else";

                    const localEnvironment: Environment = new Environment(name, environment, environment);

                    for (let j = 0; j < this._elseStatementsArrays.length; j++) {
                        const statements: Statement[] = this._elseStatementsArrays[j];

                        for (let k = 0; k < statements.length; k++) {
                            const statement: Statement = statements[k];

                            statement.execute(localEnvironment);
                        }
                    }
                }
            }
        }
    };
}

export {IfElse};
