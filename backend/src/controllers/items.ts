import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import ItemModel from "../models/item";

export const getItems: RequestHandler = async (req, res, next) => {
    try {
        const items = await ItemModel.find().exec();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

interface CreateItemBody {
    complete?: boolean,
    content: string,
}

// RequestHandler<unknown, unknown, CreateItemBody, unknown>:
// I don't use 1,3, and 4 part so it define as unkown
// 1. req.params => unkown
// 2. req.send() => unkown
// 3. req.body => define the type of body using interface that I created above
// 4. req.query => unkown
export const createItems: RequestHandler<unknown, unknown, CreateItemBody, unknown> = async (req, res, next) => {
    const complete = req.body.complete;
    const content = req.body.content;
    try {
        if (!content) {
            throw createHttpError(400, "Must include Content");
        }
        const newItem = await ItemModel.create( {
            complete: complete,
            content: content,
        });
        res.status(200).json(newItem);
    } catch (error) {
        next(error);
    }

};
