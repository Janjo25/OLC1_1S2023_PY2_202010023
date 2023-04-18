import bodyParser from "body-parser";
import cors from "cors"; // Se debe de importar CORS para no tener problema con las peticiones.
import express, {Express} from "express";

import {router as indexRouter} from "./routes/indexRouter";

const app: Express = express();

app.use(cors({origin: "http://localhost:3000"}));

app.use(bodyParser.json()); // Se convierte el JSON con el texto a un par clave-valor.

app.use("/", indexRouter);

app.listen(4000, () => console.log("El servidor se ha levantado en el puerto 4000."));
