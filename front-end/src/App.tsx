import FileSaver from "file-saver";
import React, {useRef, useState} from "react";

import "./App.css";

// noinspection FunctionNamingConventionJS
function App() {
    /*1. Los "useRef" se usan para identificar a los elementos. Similar a los ID.*/
    const inputTextBoxRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

    const createFileButtonClick = (): void => {
        if (inputTextBoxRef.current) {
            const blob = new Blob([inputTextBoxRef.current.value], {type: "text/plain"});

            // noinspection SpellCheckingInspection
            FileSaver.saveAs(blob, "typewise-code.tw");
        }
    };

    const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const openFileButtonClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [inputTextBoxValue, setInputTextBoxValue] = useState("");

    const inputTextBoxOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setInputTextBoxValue(event.target.value);
    };

    const fileInputOnChange = (): void => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const selectedFile = fileInputRef.current.files[0];

            const reader = new FileReader();

            reader.readAsText(selectedFile);

            reader.onload = (event: ProgressEvent<FileReader>): void => {
                if (event.target) {
                    if (typeof event.target.result === 'string') {
                        setInputTextBoxValue(event.target.result);
                    }
                }
            };
        }
    };

    const reportsButtonRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    const reportsDropdownMenuRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const reportsButtonOnClick = (): void => {
        if (reportsButtonRef.current && reportsDropdownMenuRef.current) {
            if (!dropdownVisible) {
                const boundingClientRect = reportsButtonRef.current.getBoundingClientRect();

                reportsDropdownMenuRef.current.style.top = boundingClientRect.bottom + 'px';
                reportsDropdownMenuRef.current.style.left = boundingClientRect.left + 'px';

                reportsDropdownMenuRef.current.style.width = reportsButtonRef.current.offsetWidth + 'px';

                reportsDropdownMenuRef.current.style.display = 'block';

                reportsButtonRef.current.style.borderRadius = '0';
            } else {
                reportsDropdownMenuRef.current.style.display = 'none';

                reportsButtonRef.current.style.borderRadius = '5px';
            }
        }

        setDropdownVisible(!dropdownVisible); // Se niega el valor actual.
    };

    const compileButtonClick = (): void => {
        if (inputTextBoxRef.current) {
            const code = inputTextBoxRef.current.value;

            fetch(
                "http://localhost:4000/compile-code", {
                    body: JSON.stringify({code}),
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                }
            )
                .then((response): Promise<string> => response.text())
                .then((text): void => console.log(text))
                .catch((error): void => alert(error));
        }
    };

    return (
        <div>
            <header>
                <h1>Bienvenido a TypeWise</h1>
            </header>

            <div className="buttons-text-boxes-container">
                <div className="buttons-container">
                    <button onClick={createFileButtonClick}>Crear archivo</button>

                    <button onClick={openFileButtonClick}>Abrir archivo</button>
                    <input accept=".tw" onChange={fileInputOnChange} ref={fileInputRef} type="file"/>

                    <button onClick={reportsButtonOnClick} ref={reportsButtonRef}>Generar reportes</button>
                    <div className="reports-dropdown-menu" ref={reportsDropdownMenuRef} style={{display: "none"}}>
                        <a>Reporte de errores</a>
                        <a>Reporte de AST</a>
                        <a>Reporte de tabla de símbolos</a>
                    </div>
                </div>

                <div className="text-boxes-container">
                    <textarea onChange={inputTextBoxOnChange} ref={inputTextBoxRef} value={inputTextBoxValue}/>

                    <span>&nbsp;&nbsp;&nbsp;</span>

                    <textarea readOnly={true}/>
                </div>

                <div className="buttons-container">
                    <button>Pestaña anterior</button>

                    <button onClick={compileButtonClick}>Compilar</button>

                    <button>Siguiente pestaña</button>
                </div>
            </div>
        </div>
    );
}

export default App;
