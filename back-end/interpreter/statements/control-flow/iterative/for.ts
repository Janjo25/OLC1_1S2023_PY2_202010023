import {Assignment} from "../../../expressions/declaration-assignment/assignment";
import {Declaration} from "../../../expressions/declaration-assignment/declaration";
import {Environment} from "../../../environment";
import {Expression} from "../../../expressions/expression";
import {Identifier} from "../../../expressions/identifier/identifier";
import {InterpreterSymbol} from "../../../tables/symbols/interpreterSymbol";
import {Operation} from "../../../expressions/operation/operation";
import {Statement} from "../../statement";

type Initialization = Assignment | Declaration;

// noinspection AssignmentToForLoopParameterJS,JSClassNamingConvention,SuspiciousTypeOfGuard
class For extends Statement {
    private readonly _column: number;
    private readonly _condition: Expression;
    private readonly _forStatementsArray: Statement[];
    private readonly _increment: Expression;
    private readonly _initialization: Assignment | Declaration;
    private readonly _line: number;

    constructor(init: Initialization, cond: Expression, incr: Expression, stmts: Statement[], ln: number, col: number) {
        super();

        this._initialization = init;
        this._condition = cond;
        this._increment = incr;

        this._forStatementsArray = stmts;

        this._line = ln;
        this._column = col;
    };

    execute(environment: Environment): void {
        if (this._initialization instanceof Assignment) {
            this._initialization.execute(environment);
        } else {
            this._initialization.execute(environment);
        }

        const localEnv: Environment = new Environment("Sentencia iterativa-for", environment, environment.global);

        for (let i = 0; i < this._forStatementsArray.length; i++) {
            const statement: Statement = this._forStatementsArray[i];

            if (statement instanceof Expression) {
                statement.getValue(localEnv);
            } else {
                statement.execute(localEnv);
            }

            if (i === this._forStatementsArray.length - 1) {
                if (this._increment instanceof Assignment) {
                    this._increment.execute(localEnv);
                } else if (this._increment instanceof Operation) {
                    let name!: string;

                    if (this._increment.leftOperand instanceof Identifier) {
                        name = this._increment.leftOperand.identifier;
                    }

                    const interpreterSymbol: InterpreterSymbol | undefined = environment.getSymbol(name);

                    const type: number = interpreterSymbol!.type;
                    const value: boolean | number | string | undefined = this._increment.getValue(localEnv);
                    const line: number = this._line;
                    const column: number = this._column;

                    const symbol: InterpreterSymbol = new InterpreterSymbol(type, name, value!, line, column);

                    environment.setSymbol(name, symbol);
                } else if (this._increment instanceof Statement) {
                    this._increment.execute(localEnv);
                }

                if (this._condition instanceof Expression) {
                    if (this._condition.getValue(localEnv)!) {
                        i = -1;
                    }
                }
            }
        }
    };
}

export {For};
