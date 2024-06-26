import app from './app';
import "dotenv/config";
import express, { Request, Response} from "express";
import mongoose from "mongoose";
import env from './util/validateEnv';


const PORT = process.env.PORT || env.PORT || 3000;
const mongoConnectionString = env.MONGO_CONNECTION_STRING;


mongoose.connect(mongoConnectionString)
    .then( () => {
        console.log("MongoDB CONNECTED");
        app.listen(PORT, ()=>{
            console.log("server is running port!" + PORT)
        });
    }).catch( (error) => {
        console.error("Error connecting to MongoDB", error);
    });






