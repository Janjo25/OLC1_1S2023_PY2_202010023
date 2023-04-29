import {StringBuilder} from "../../../utils/StringBuilder";

class SymbolsTableVisualizer {
    private readonly _symbolsTable: StringBuilder;

    constructor() {
        this._symbolsTable = new StringBuilder();

        this.initializeHTMLTable();
    };

    get symbolsTable(): StringBuilder {
        return this._symbolsTable;
    };

    appendSymbol(id: string, sType: string, dType: string, environment: string, line: string, column: string): void {
        this._symbolsTable.append("    <tr>");

        this._symbolsTable.append("        <td>" + id + "</td>");
        this._symbolsTable.append("        <td>" + sType + "</td>");
        this._symbolsTable.append("        <td>" + dType + "</td>");
        this._symbolsTable.append("        <td>" + environment + "</td>");
        this._symbolsTable.append("        <td>" + line + "</td>");
        this._symbolsTable.append("        <td>" + column + "</td>");

        this._symbolsTable.append("    </tr>");
    };

    initializeHTMLTable(): void {
        this._symbolsTable.append("<table>");

        this._symbolsTable.append("    <thead>");

        this._symbolsTable.append("    <tr>");

        this._symbolsTable.append("        <th>Identificador</th>");
        this._symbolsTable.append("        <th>Tipo-Dato</th>");
        this._symbolsTable.append("        <th>Entorno</th>");
        this._symbolsTable.append("        <th>Línea</th>");
        this._symbolsTable.append("        <th>Columna</th>");

        this._symbolsTable.append("    </tr>");

        this._symbolsTable.append("    </thead>");

        this._symbolsTable.append("    <tbody>");
    };

    reset(): void {
        this._symbolsTable.reset();

        this.initializeHTMLTable();
    };
}

const symbolsTableVisualizer: SymbolsTableVisualizer = new SymbolsTableVisualizer();

export {symbolsTableVisualizer};
