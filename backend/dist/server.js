"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const PORT = process.env.PORT || validateEnv_1.default.PORT || 5005 || 5010;
const mongoConnectionString = validateEnv_1.default.MONGO_CONNECTION_STRING;
// const PORT = 5010;
mongoose_1.default.connect(mongoConnectionString)
    .then(() => {
    console.log("MongoDB CONNECTED");
    app_1.default.listen(PORT, () => {
        console.log("server is running port: " + PORT);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB", error);
});
