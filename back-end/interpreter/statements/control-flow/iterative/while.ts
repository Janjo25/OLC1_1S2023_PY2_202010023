import {Environment} from "../../../environment";
import {Expression} from "../../../expressions/expression";
import {Operation} from "../../../expressions/operation/operation";
import {Statement} from "../../statement";

// noinspection AssignmentToForLoopParameterJS,SuspiciousTypeOfGuard
class While extends Statement {
    private readonly _condition: Expression;
    private readonly _whileStatementsArray: Statement[];

    constructor(condition: Expression, whileStatementsArray: Statement[]) {
        super();

        this._condition = condition;

        this._whileStatementsArray = whileStatementsArray;
    };

    execute(environment: Environment): void {
        const condition: Expression = this._condition;

        let result: boolean | number | string | undefined;

        if (condition instanceof Operation) {
            result = condition.getValue(environment);
        }

        if (result) {
            const name: string = "Sentencia iterativa-while";

            const localEnvironment: Environment = new Environment(name, environment, environment.global);

            for (let i = 0; i < this._whileStatementsArray.length; i++) {
                const statement: Statement = this._whileStatementsArray[i];

                if (statement instanceof Expression) {
                    statement.getValue(localEnvironment);
                } else {
                    statement.execute(localEnvironment);
                }

                if (i === this._whileStatementsArray.length - 1) {
                    if (condition.getValue(localEnvironment)!) {
                        i = -1;
                    }
                }
            }
        }
    };
}

export {While};
