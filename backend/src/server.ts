import app from './app';
import "dotenv/config";
import mongoose from "mongoose";
import env from './util/validateEnv';

const PORT = process.env.PORT || env.PORT || 5005 || 5010;
const mongoConnectionString = env.MONGO_CONNECTION_STRING;
// const PORT = 5010;

mongoose.connect(mongoConnectionString)
    .then( () => {
        console.log("MongoDB CONNECTED");
        app.listen(PORT, ()=>{
            console.log("server is running port: " + PORT)
        });
    }).catch( (error) => {
        console.error("Error connecting to MongoDB", error);
    });






