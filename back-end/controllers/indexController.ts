import {Request, Response} from "express";

import {Statement} from "../interpreter/statements/statement";
import {interpreterErrorsList} from "../interpreter/tables/errors/interpreterErrorsList";
import {output} from "../interpreter/output/output";

const {parser} = require("../interpreter/parser/parser");

export class IndexController {
    static compileCode(req: Request, res: Response): void {
        interpreterErrorsList.reset();
        output.reset();

        const code = req.body.code;

        let parsedCode;

        try {
            parsedCode = parser.parse(code);
        } catch (e) {
            for (let i = 0; i < interpreterErrorsList.getLength(); i++) {
                output.append(("-> " + interpreterErrorsList.getError(i).getMessage() + '\n'));
            }

            console.log(output.stringBuilder.toString());

            res.send(output.stringBuilder.toString());

            return;
        }

        for (let i = 0; i < parsedCode.length; i++) {
            if (parsedCode[i] instanceof Statement) {
                parsedCode[i].execute();
            }
        }

        console.log(output.stringBuilder.toString());

        res.send(output.stringBuilder.toString());

        return;
    };
}
