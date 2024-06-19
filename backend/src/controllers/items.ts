import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import ItemModel from "../models/item";
import { createDeflate } from "zlib";

export const getItems: RequestHandler = async (req, res, next) => {
    try {
        const items = await ItemModel.find().exec();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

interface CreateItemBody {
    id: number,
    isDone?: boolean,
    content: string,
    createDate: number,
}

// RequestHandler<unknown, unknown, CreateItemBody, unknown>:
// I don't use 1,3, and 4 part so it define as unkown
// 1. req.params => unkown
// 2. req.send() => unkown
// 3. req.body => define the type of body using interface that I created above
// 4. req.query => unkown
export const createItems: RequestHandler<unknown, unknown, CreateItemBody, unknown> = async (req, res, next) => {
    const id = req.body.id;
    const isDone = req.body.isDone;
    const content = req.body.content;
    const createDate = req.body.createDate;

    try {
        if (!content) {
            throw createHttpError(400, "Must include Content");
        }
        const newItem = await ItemModel.create( {
            id: id,
            isDone: isDone,
            content: content,
            createDate: createDate,
        });
        res.status(200).json(newItem);
    } catch (error) {
        next(error);
    }

};
