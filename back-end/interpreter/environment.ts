import {DeclarationType} from "./expressions/declaration-assignment/declarationType";
import {InterpreterSymbol} from "./tables/symbols/interpreterSymbol";
import {symbolsTableVisualizer} from "./tables/symbols/symbolsTableVisualizer";

class Environment {
    global: Environment;

    private _symbolTableArray: { name: string; symbol: InterpreterSymbol }[];

    private readonly _name: string;
    private readonly _parent: Environment | null;

    constructor(name: string, parent: Environment | null, global: Environment | null) {
        this._name = name;

        this._parent = parent;

        if (global === null) {
            this.global = this;
        } else {
            this.global = global;
        }

        this._symbolTableArray = [];
    };

    appendSymbol(name: string, symbol: InterpreterSymbol): void {
        this._symbolTableArray.push({name, symbol});

        const id: string = symbol.name;
        const symbolType: string = 'Variable';
        const dataType: string = <string>this.getType(symbol.type);
        const environment: string = this._name;
        const line: string = String(symbol.line);
        const column: string = String(symbol.column);

        symbolsTableVisualizer.appendSymbol(id, symbolType, dataType, environment, line, column);
    };

    checkSymbol(name: string): boolean { // Este método revisa que no se duplique algún símbolo.
        for (let i = 0; i < this._symbolTableArray.length; i++) {
            if (this._symbolTableArray[i].name.toString().toLowerCase() === name.toString().toLowerCase()) {
                return true;
            }
        }

        if (this._parent === null) {
            return false;
        } else { // Si no se encontró el símbolo en el entorno actual, se revisa en el entorno padre.
            return this._parent.checkSymbol(name);
        }
    };

    getSymbol(this: Environment, name: string): InterpreterSymbol | undefined {
        for (let environment = this; environment != null; environment = <Environment>environment._parent) {
            for (let i = 0; i < environment._symbolTableArray.length; i++) {
                if (environment._symbolTableArray[i].name.toString().toLowerCase() === name.toString().toLowerCase()) {
                    return environment._symbolTableArray[i].symbol;
                }
            }
        }
    };

    getType(type: number): string | undefined {
        switch (type) {
            case DeclarationType.BOOLEAN:
                return 'Booleano';
            case DeclarationType.CHAR:
                return 'Carácter';
            case DeclarationType.DOUBLE:
                return 'Doble';
            case DeclarationType.INT:
                return 'Entero';
            case DeclarationType.STRING:
                return 'Cadena';
            default:
                return; // Este caso nunca se ejecutará.
        }
    };

    setSymbol(this: Environment, name: string, symbol: InterpreterSymbol): void {
        for (let environment = this; environment != null; environment = <Environment>environment._parent) {
            for (let i = 0; i < environment._symbolTableArray.length; i++) {
                const temp: { name: string; symbol: InterpreterSymbol } = environment._symbolTableArray[i];

                if (temp.name.toString().toLowerCase() === name.toString().toLowerCase()) {
                    temp.symbol = symbol;

                    return;
                }
            }
        }
    };
}

export {Environment};
