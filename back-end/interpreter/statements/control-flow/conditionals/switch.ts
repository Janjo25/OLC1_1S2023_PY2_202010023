import {Environment} from "../../../environment";
import {Expression} from "../../../expressions/expression";
import {Statement} from "../../statement";
import {Variable} from "../../../expressions/declaration-assignment/variable";

class Switch extends Statement {
    private _caseStatementsArrays: Statement[][];
    private _conditionsArray: Expression[];
    private _defaultStatementsArray: Statement[];

    private readonly _expression: Expression;

    constructor(expression: Expression) {
        super();

        this._expression = expression;

        this._conditionsArray = [];

        this._caseStatementsArrays = [];

        this._defaultStatementsArray = [];
    };

    execute(environment: Environment): void {
        const name: string = "Sentencia conditional-switch";

        const localEnvironment: Environment = new Environment(name, environment, environment.global);

        const expression: Expression = this._expression;

        let result!: number | string;

        if (expression instanceof Variable) {
            result = expression.getValue(environment);
        }

        let caseValue;

        for (let i = 0; i < this._conditionsArray.length; i++) {
            const condition: Expression = this._conditionsArray[i];

            if (condition instanceof Variable) {
                caseValue = condition.getValue(localEnvironment);
            }

            if (result == caseValue) {
                if (this._expression.getType(localEnvironment) === condition.getType(localEnvironment)) {
                    for (let j = 0; j < this._caseStatementsArrays[i].length; j++) {
                        const statement: Statement = this._caseStatementsArrays[i][j];

                        statement.execute(localEnvironment);
                    }
                }
            }

            if (i == this._conditionsArray.length - 1) {
                if (this._defaultStatementsArray !== undefined) {
                    for (let j = 0; j < this._defaultStatementsArray.length; j++) {
                        const statement: Statement = this._defaultStatementsArray[j];

                        statement.execute(localEnvironment);
                    }
                }
            }
        }
    };

    setCases(conditionsArray: Expression[], caseStatementsArrays: Statement[][]): void {
        this._conditionsArray = conditionsArray;

        this._caseStatementsArrays = caseStatementsArrays;
    };

    setDefault(defaultStatementsArray: Statement[]): void {
        this._defaultStatementsArray = defaultStatementsArray;
    };
}

export {Switch};
