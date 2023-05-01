import {StringBuilder} from "../../../utils/StringBuilder";

class ErrorsTableVisualizer {
    private readonly _errorsTable: StringBuilder;

    constructor() {
        this._errorsTable = new StringBuilder();

        this.initializeHTMLTable();
    };

    get errorsTable(): StringBuilder {
        return this._errorsTable;
    };

    appendError(id: string, description: string, line: string, column: string): void {
        this._errorsTable.append("    <tr>");

        this._errorsTable.append("        <td>" + id + "</td>");
        this._errorsTable.append("        <td>" + description + "</td>");
        this._errorsTable.append("        <td>" + line + "</td>");
        this._errorsTable.append("        <td>" + column + "</td>");

        this._errorsTable.append("    </tr>");
    };

    initializeHTMLTable(): void {
        this._errorsTable.append("<table>");

        this._errorsTable.append("    <thead>");

        this._errorsTable.append("    <tr>");

        this._errorsTable.append("        <th>Identificador</th>");
        this._errorsTable.append("        <th>Tipo</th>");
        this._errorsTable.append("        <th>Descripción</th>");
        this._errorsTable.append("        <th>Línea</th>");
        this._errorsTable.append("        <th>Columna</th>");

        this._errorsTable.append("    </tr>");

        this._errorsTable.append("    </thead>");

        this._errorsTable.append("    <tbody>");
    };

    reset(): void {
        this._errorsTable.reset();

        this.initializeHTMLTable();
    };
}

const errorsTableVisualizer: ErrorsTableVisualizer = new ErrorsTableVisualizer();

export {errorsTableVisualizer};
