import express, { NextFunction, Request, Response} from "express";
import ItemRoutes from "./routes/items";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import path from "path";

const app = express();
const cors = require('cors');


app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/api/items");
});

app.use("/api/items", ItemRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

app.use( (req, res, next) => {
    next(createHttpError(404, "Endpint Not Found"));
});

app.use( ( error: unknown, req: Request, res: Response, next: NextFunction) => {
 console.error(error);
 let errorMessage = "Unknown Error";
 let statusCode = 500;
 if (isHttpError(error)) {
     statusCode = error.status;
     errorMessage = error.name
 } else {
     res.status(statusCode).json( { error: errorMessage });
 }

})

export default app;