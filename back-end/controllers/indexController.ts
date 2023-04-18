import {Request, Response} from "express";

export class IndexController {
    static compileCode(req: Request, res: Response): void {
        res.send(req.body.text);
    }
}
