import {Environment} from "../environment";

abstract class Expression {
    abstract getType(environment: Environment): void;

    abstract getValue(environment: Environment): void;
}

export {Expression};
