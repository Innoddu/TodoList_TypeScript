import express, { NextFunction, Request, Response} from "express";
import "dotenv/config";
import env from "./util/validateEnv";
import ItemRoutes from "./routes/items";
import UserRoutes from "./routes/users";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./midleware/auth";


const app = express();
const cors = require('cors');
const allowedOrigins = ['https://create-your-todolist-75c62e8accfe.herokuapp.com/', 'http://localhost:3010'];
const corsOptions = {
    origin: function(origin: any, callback: any) {
        console.log("Request Origin:", origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
  
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(express.json());
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
}))

app.use("/api/users", UserRoutes);
app.use("/api/items", requiresAuth, ItemRoutes);

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