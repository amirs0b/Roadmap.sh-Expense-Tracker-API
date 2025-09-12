import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import { catchError,HandleERROR } from "vanta-api";

import exportValidation from "./Middlewares/ExportValidation.js";

import isAdmin from "./Middlewares/IsAdmin.js";
import isLogin from "./Middlewares/IsLogin.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/uploads',express.static("Public/Uploads"));
app.use(exportValidation);




app.use((req, res, next) => {
    return next(new HandleERROR('Not Found', 404));
});
app.use(catchError)
export default app