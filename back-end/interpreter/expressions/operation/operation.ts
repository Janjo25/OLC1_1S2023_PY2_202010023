import {DeclarationType as DType} from "../declaration-assignment/declarationType";
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

    getType(): null | number {
        return this._type;
    };

    getValue(): boolean | number | string | undefined {
        let leftOperand;
        let rightOperand;

        let result;

        switch (this._operationType) {
            case OperationType.ADDITION:
                this._type = this.getSumType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                const trueValue = parseFloat(String(1));
                                const falseValue = parseFloat(String(0));

                                leftOperand = this._leftOperand.getValue() == 'true' ? trueValue : falseValue;
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue() == 'true' ? 1 : 0;
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue() == 'true' ? '1' : '0';
                                rightOperand = this._rightOperand.getValue().toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de suma con los datos proporcionados.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '');
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) + parseFloat(String(rightOperand));

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '');
                                rightOperand = this._rightOperand.getValue().toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de suma con los datos proporcionados.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                const trueValue = parseFloat(String(1));
                                const falseValue = parseFloat(String(0));

                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue() == 'true' ? trueValue : falseValue;

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) + parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                return; // Este caso nunca se ejecutará.
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue() == 'true' ? 1 : 0;

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString().replace(/"/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            default:
                                return; // Este caso nunca se ejecutará.
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString().replace(/"/g, '');
                                rightOperand = this._rightOperand.getValue() == 'true' ? '1' : '0';

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/"/g, '');
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '');

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/"/g, '');
                                rightOperand = this._rightOperand.getValue().toString();

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/"/g, '');
                                rightOperand = this._rightOperand.getValue().toString();

                                result = leftOperand + rightOperand;

                                return result;
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString().replace(/"/g, '');
                                rightOperand = this._rightOperand.getValue().toString().replace(/"/g, '');

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        leftOperand = this._leftOperand.getValue().toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>this._leftOperand.getValue());

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>this._leftOperand.getValue());

                        break;
                    case DType.STRING:
                        leftOperand = this._leftOperand.getValue().toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                switch (this._rightOperand.getType()) {
                    case DType.BOOLEAN:
                        rightOperand = this._rightOperand.getValue().toString() == 'true';

                        break;
                    case DType.CHAR:
                        rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                        rightOperand = parseInt(String(rightOperand));

                        break;
                    case DType.DOUBLE:
                        rightOperand = parseFloat(<string>this._rightOperand.getValue());

                        break;
                    case DType.INT:
                        rightOperand = parseInt(<string>this._rightOperand.getValue());

                        break;
                    case DType.STRING:
                        rightOperand = this._rightOperand.getValue().toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = leftOperand && rightOperand;

                return result;
            case OperationType.DIVISION:
                this._type = this.getQuotientType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

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
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

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
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                if (rightOperand != 0) {
                                    result = parseFloat(String(leftOperand)) / parseFloat(String(rightOperand));

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                if (rightOperand != 0) {
                                    result = leftOperand / rightOperand;

                                    return result;
                                }

                                alert("No es posible realizar una operación de división con divisor cero.");

                                return;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) == parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) == parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) == parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand == rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand == rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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
                this._type = this.getExponentiationType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de exponenciación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = Math.pow(leftOperand, rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) > parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) > parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) > parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand > rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand > rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) >= parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) >= parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) >= parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand >= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand >= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) != parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) != parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) != parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand != rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand != rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) < parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) < parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) < parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand < rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand < rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = this._leftOperand.getValue().toString() == 'true';
                                rightOperand = this._rightOperand.getValue().toString() == 'true';

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) <= parseFloat(<string>rightOperand);

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseInt(String(leftOperand)) <= parseInt(<string>rightOperand);

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(<string>leftOperand) <= parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand <= rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand <= rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una comparación.");

                                return;
                        }
                    case DType.STRING:
                        switch (this._rightOperand.getType()) {
                            case DType.STRING:
                                leftOperand = this._leftOperand.getValue().toString();
                                rightOperand = this._rightOperand.getValue().toString();

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
                this._type = this.getQuotientType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand % rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand % rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de módulo con los datos proporcionados.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand % rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

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
                this._type = this.getProductType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = this._rightOperand.getValue();

                                result = parseFloat(String(leftOperand)) * parseFloat(String(rightOperand));

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand * rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) * parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand * rightOperand;

                                return result;
                            default:
                                alert("Los operandos no son válidos para realizar una operación de multiplicación.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand * rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

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
                switch (this._leftOperand.getType()) {
                    case DType.DOUBLE:
                        this._type = DType.DOUBLE;

                        leftOperand = parseFloat(<string>this._leftOperand.getValue());

                        result = -leftOperand;

                        return result;
                    case DType.INT:
                        this._type = DType.INT;

                        leftOperand = parseInt(<string>this._leftOperand.getValue());

                        result = -leftOperand;

                        return result;
                    default:
                        alert("No es posible realizar una operación de negación con el dato proporcionado.");

                        return;
                }
            case OperationType.NOT:
                this._type = DType.BOOLEAN;

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        leftOperand = this._leftOperand.getValue().toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>this._leftOperand.getValue());

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>this._leftOperand.getValue());

                        break;
                    case DType.STRING:
                        leftOperand = this._leftOperand.getValue().toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = !leftOperand;

                return result;
            case OperationType.OR:
                this._type = DType.BOOLEAN;

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        leftOperand = this._leftOperand.getValue().toString() == 'true';

                        break;
                    case DType.CHAR:
                        leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                        leftOperand = parseInt(String(leftOperand));

                        break;
                    case DType.DOUBLE:
                        leftOperand = parseFloat(<string>this._leftOperand.getValue());

                        break;
                    case DType.INT:
                        leftOperand = parseInt(<string>this._leftOperand.getValue());

                        break;
                    case DType.STRING:
                        leftOperand = this._leftOperand.getValue().toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                switch (this._rightOperand.getType()) {
                    case DType.BOOLEAN:
                        rightOperand = this._rightOperand.getValue().toString() == 'true';

                        break;
                    case DType.CHAR:
                        rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                        rightOperand = parseInt(String(rightOperand));

                        break;
                    case DType.DOUBLE:
                        rightOperand = parseFloat(<string>this._rightOperand.getValue());

                        break;
                    case DType.INT:
                        rightOperand = parseInt(<string>this._rightOperand.getValue());

                        break;
                    case DType.STRING:
                        rightOperand = this._rightOperand.getValue().toString();

                        break;
                    default:
                        return; // Este caso nunca se ejecutará.
                }

                result = leftOperand || rightOperand;

                return result;
            case OperationType.SUBTRACTION:
                this._type = this.getDifferenceType(this._leftOperand.getType(), this._rightOperand.getType());

                switch (this._leftOperand.getType()) {
                    case DType.BOOLEAN:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                const floatTrueValue = parseFloat(String(1));
                                const floatFalseValue = parseFloat(String(0));

                                leftOperand = this._leftOperand.getValue() == 'true' ? floatTrueValue : floatFalseValue;
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                const intTrueValue = parseInt(String(1));
                                const intFalseValue = parseInt(String(0));

                                leftOperand = this._leftOperand.getValue() == 'true' ? intTrueValue : intFalseValue;
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.CHAR:
                        switch (this._rightOperand.getType()) {
                            case DType.DOUBLE:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = this._leftOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.DOUBLE:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                const trueValue = parseFloat(String(1));
                                const falseValue = parseFloat(String(0));

                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue() == 'true' ? trueValue : falseValue;

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = this._leftOperand.getValue();
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = parseFloat(String(leftOperand)) - parseFloat(String(rightOperand));

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            default:
                                alert("No es posible realizar una operación de resta con los datos proporcionados.");

                                return;
                        }
                    case DType.INT:
                        switch (this._rightOperand.getType()) {
                            case DType.BOOLEAN:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue() == 'true' ? 1 : 0;

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.CHAR:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = this._rightOperand.getValue().toString().replace(/'/g, '').charCodeAt(0);

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.DOUBLE:
                                leftOperand = parseFloat(<string>this._leftOperand.getValue());
                                rightOperand = parseFloat(<string>this._rightOperand.getValue());

                                result = leftOperand - rightOperand;

                                return result;
                            case DType.INT:
                                leftOperand = parseInt(<string>this._leftOperand.getValue());
                                rightOperand = parseInt(<string>this._rightOperand.getValue());

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
