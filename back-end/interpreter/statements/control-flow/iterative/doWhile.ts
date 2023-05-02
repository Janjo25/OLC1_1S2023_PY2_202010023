import {Environment} from "../../../environment";
import {Expression} from "../../../expressions/expression";
import {Statement} from "../../statement";

// noinspection AssignmentToForLoopParameterJS,SuspiciousTypeOfGuard
class DoWhile extends Statement {
    private _column: number;
    private _condition: Expression;
    private _line: number;

    private readonly _doWhileStatementsArray: Statement[];

    constructor(condition: Expression, doWhileStatementsArray: Statement[], line: number, column: number) {
        super();

        this._condition = condition;

        this._doWhileStatementsArray = doWhileStatementsArray;

        this._line = line;
        this._column = column;
    };

    execute(environment: Environment): void {
        const name: string = "Sentencia iterativa-doWhile";

        const localEnvironment: Environment = new Environment(name, environment, environment.global);

        for (let i = 0; i < this._doWhileStatementsArray.length; i++) {
            const statement: Statement = this._doWhileStatementsArray[i];

            if (statement instanceof Expression) {
                statement.getValue(localEnvironment);
            } else {
                statement.execute(localEnvironment);
            }

            if (i === this._doWhileStatementsArray.length - 1) {
                if (this._condition.getValue(localEnvironment)!) {
                    i = -1;
                }
            }
        }
    };
}

export {DoWhile};
