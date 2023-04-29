import {DeclarationType as DType} from "../declaration-assignment/declarationType";
import {Environment} from "../../environment";
import {Expression} from "../expression";
import {OperationType} from "./operationType";
import {Variable} from "../declaration-assignment/variable";

// noinspection DuplicatedCode,SpellCheckingInspection
class Operation extends Expression {
    private _leftOperand: Variable;
    private _rightOperand: Variable;
    private _type: null | number;

    private readonly _operationType: number;

    constructor(operationType: number, leftOperand: Variable, rightOperand: Variable) {
        super();

        this._operationType = operationType;

        this._leftOperand = leftOperand;
        this._rightOperand = rightOperand;

        this._type = null; // Esto se retornará para saber el tipo de dato al que pertence el resultado de la operación.
    };

    getDifferenceType(leftOperand: number, rightOperand: number): DType.DOUBLE | DType.INT | null {
        if (leftOperand == DType.DOUBLE || rightOperand == DType.DOUBLE) {
            return DType.DOUBLE;
        } else if (leftOperand == DType.INT || rightOperand == DType.INT) {
            return DType.INT;
        }

        return null;
    };

    getExponentiationType(leftOperand: number, rightOperand: number): DType.DOUBLE | DType.INT | null {
        if (leftOperand == DType.DOUBLE || rightOperand == DType.DOUBLE) {
            return DType.DOUBLE;
        } else if (leftOperand == DType.INT && rightOperand == DType.INT) {
            return DType.INT;
        }

        return null;
    };

    getProductType(leftOperand: number, rightOperand: number): DType.DOUBLE | DType.INT | null {
        if (leftOperand == DType.DOUBLE || rightOperand == DType.DOUBLE) {
            return DType.DOUBLE;
        } else if (leftOperand == DType.INT || rightOperand == DType.INT) {
            return DType.INT;
        }

        return null;
    };

    getQuotientType(leftOperand: number, rightOperand: number): DType.DOUBLE | null {
        if (leftOperand == DType.DOUBLE || rightOperand == DType.DOUBLE) {
            return DType.DOUBLE;
        } else if (leftOperand == DType.INT || rightOperand == DType.INT) {
            return DType.DOUBLE;
        }

        return null;
    };

    getSumType(leftOperand: number, rightOperand: number): DType.DOUBLE | DType.INT | DType.STRING | null {
        if (leftOperand == DType.CHAR && rightOperand == DType.CHAR) {
            return DType.STRING;
        } else if (leftOperand == DType.DOUBLE || rightOperand == DType.DOUBLE) {
            return DType.DOUBLE;
        } else if (leftOperand == DType.INT || rightOperand == DType.INT) {
            return DType.INT;
        } else if (leftOperand == DType.STRING || rightOperand == DType.STRING) {
            return DType.STRING;
        }

        return null;
    };

    getType(environment: Environment): null | number {
        return this._type;
    };

    getValue(environment: Environment): boolean | number | string | undefined {
        let leftType!: number;
        let rightType!: number;

        let leftValue!: boolean | number | string; // Se usa el "!" para aclarar que la variable nunca será nula.
        let rightValue!: boolean | number | string;

        let leftOperand: boolean | number | string;
        let rightOperand: boolean | number | string;

        let result: boolean | number | string;

        leftValue = this._leftOperand.getValue(environment);
        leftType = this._leftOperand.getType(environment);

        rightValue = this._rightOperand.getValue(environment);
        rightType = this._rightOperand.getType(environment);

        switch (this._operationType) {
            case OperationType.ADDITION:
                this._type = this.getSumType(leftType, rightType);

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.DOUBLE:
                                const trueValue: number = parseFloat(String(1));
                                const falseValue: number = parseFloat(String(0));

                                leftOperand = leftValue == 'true' ? trueValue : falseValue;
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = leftValue == 'true' ? 1 : 0;
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = leftValue == 'true' ? '1' : '0';
                                rightOperand = rightValue.toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de suma con los datos proporcionados.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '');
                                rightOperand = rightValue.toString().replace(/'/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) + parseFloat(String(rightOperand));

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = leftValue.toString().replace(/'/g, '');
                                rightOperand = rightValue.toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de suma con los datos proporcionados.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                const trueValue: number = parseFloat(String(1));
                                const falseValue: number = parseFloat(String(0));

                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = rightValue == 'true' ? trueValue : falseValue;

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) + parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                return; // Este caso nunca se ejecutará.
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue == 'true' ? 1 : 0;

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                return; // Este caso nunca se ejecutará.
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString().replace(/"/g, '');
                                rightOperand = rightValue == 'true' ? '1' : '0';

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/"/g, '');
                                rightOperand = rightValue.toString().replace(/'/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/"/g, '');
                                rightOperand = rightValue.toString();

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/"/g, '');
                                rightOperand = rightValue.toString();

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = leftValue.toString().replace(/"/g, '');
                                rightOperand = rightValue.toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                return; // Este caso nunca se ejecutará.
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.AND:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        leftOperand = leftValue.toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>leftValue);

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>leftValue);

                        break;
                    case DType.STRING:
                        leftOperand = leftValue.toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                switch (rightType) {
                    case DType.BOOLEAN:
                        rightOperand = rightValue.toString() == 'true';

                        break;
                    case DType.CHAR:
                        rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                        rightOperand = parseInt(String(rightOperand));

                        break;
                    case DType.DOUBLE:
                        rightOperand = parseFloat(<string>rightValue);

                        break;
                    case DType.INT:
                        rightOperand = parseInt(<string>rightValue);

                        break;
                    case DType.STRING:
                        rightOperand = rightValue.toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = leftOperand && rightOperand;

                return result;
            case OperationType.DIVISION:
                this._type = this.getQuotientType(leftType, rightType);

                switch (leftType) {
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            default:
                                alert("No es posible realizar una operación de división con los datos proporcionados.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            default:
                                alert("No es posible realizar una operación de división con los datos proporcionados.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            default:
                                alert("No es posible realizar una operación de división con los datos proporcionados.");

                                return;
                        }
                    default:
                        alert("No es posible realizar una operación de división con los datos proporcionados.");

                        return;
                }
            case OperationType.EQUALITY:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) == parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) == parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) == parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.EXPONENTIATION:
                this._type = this.getExponentiationType(leftType, rightType);

                switch (leftType) {
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de exponenciación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de exponenciación.");

                                return;
                        }
                    default:
                        alert("Los operandos no son válidos para realizar una operación de exponenciación.");

                        return;
                }
            case OperationType.GREATER_THAN:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) > parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) > parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) > parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.GREATER_THAN_OR_EQUAL_TO:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) >= parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) >= parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) >= parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.INEQUALITY:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) != parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) != parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) != parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.LESS_THAN:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) < parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) < parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) < parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.LESS_THAN_OR_EQUAL_TO:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = leftValue.toString() == 'true';
                                rightOperand = rightValue.toString() == 'true';

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) <= parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseInt(String(leftOperand)) <= parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) <= parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (rightType) {
                            case DType.STRING:
                                leftOperand = leftValue.toString();
                                rightOperand = rightValue.toString();

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    default:
                        return; // Este caso nunca se ejecutará.
                }
            case OperationType.MODULUS:
                this._type = this.getQuotientType(leftType, rightType);

                switch (leftType) {
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand % rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand % rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de módulo con los datos proporcionados.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand % rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand % rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de módulo con los datos proporcionados.");

                                return;
                        }
                    default:
                        alert("No es posible realizar una operación de módulo con los datos proporcionados.");

                        return;
                }
            case OperationType.MULTIPLICATION:
                this._type = this.getProductType(leftType, rightType);

                switch (leftType) {
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = rightValue;

                                result = parseFloat(String(leftOperand)) * parseFloat(String(rightOperand));

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand * rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) * parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand * rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand * rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                                return;
                        }
                    default:
                        alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                        return;
                }
            case OperationType.NEGATION:
                switch (leftType) {
                    case DType.DOUBLE:
                        this._type = DType.DOUBLE;

                        leftOperand = parseFloat(<string>leftValue);

                        result = -leftOperand;

                        return result;
                    case DType.INT:
                        this._type = DType.INT;

                        leftOperand = parseInt(<string>leftValue);

                        result = -leftOperand;

                        return result;
                    default:
                        alert("No es posible realizar una operación de negación con el dato proporcionado.");

                        return;
                }
            case OperationType.NOT:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        leftOperand = leftValue.toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>leftValue);

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>leftValue);

                        break;
                    case DType.STRING:
                        leftOperand = leftValue.toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = !leftOperand;

                return result;
            case OperationType.OR:
                this._type = DType.BOOLEAN;

                switch (leftType) {
                    case DType.BOOLEAN:
                        leftOperand = leftValue.toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>leftValue);

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>leftValue);

                        break;
                    case DType.STRING:
                        leftOperand = leftValue.toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                switch (rightType) {
                    case DType.BOOLEAN:
                        rightOperand = rightValue.toString() == 'true';

                        break;
                    case DType.CHAR:
                        rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                        rightOperand = parseInt(String(rightOperand));

                        break;
                    case DType.DOUBLE:
                        rightOperand = parseFloat(<string>rightValue);

                        break;
                    case DType.INT:
                        rightOperand = parseInt(<string>rightValue);

                        break;
                    case DType.STRING:
                        rightOperand = rightValue.toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = leftOperand || rightOperand;

                return result;
            case OperationType.SUBTRACTION:
                this._type = this.getDifferenceType(leftType, rightType);

                switch (leftType) {
                    case DType.BOOLEAN:
                        switch (rightType) {
                            case DType.DOUBLE:
                                const floatTrueValue: number = parseFloat(String(1));
                                const floatFalseValue: number = parseFloat(String(0));

                                leftOperand = leftValue == 'true' ? floatTrueValue : floatFalseValue;
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                const intTrueValue: number = parseInt(String(1));
                                const intFalseValue: number = parseInt(String(0));

                                leftOperand = leftValue == 'true' ? intTrueValue : intFalseValue;
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.CHAR:
                        switch (rightType) {
                            case DType.DOUBLE:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = leftValue.toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                const trueValue: number = parseFloat(String(1));
                                const falseValue: number = parseFloat(String(0));

                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = rightValue == 'true' ? trueValue : falseValue;

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = leftValue;
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) - parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.INT:
                        switch (rightType) {
                            case DType.BOOLEAN:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue == 'true' ? 1 : 0;

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = rightValue.toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>leftValue);
                                rightOperand = parseFloat(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>leftValue);
                                rightOperand = parseInt(<string>rightValue);

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    default:
                        alert("No es posible realizar una operación de resta con los datos proporcionados.");

                        return;
                }
            default:
                return; // Este caso nunca se ejecutará.
        }
    };
}

export {Operation};
