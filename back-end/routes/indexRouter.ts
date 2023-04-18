import express, {Router} from "express";

import {IndexController} from "../controllers/indexController";

const router: Router = express.Router();

router.post("/compile-code", IndexController.compileCode);

export {router};
