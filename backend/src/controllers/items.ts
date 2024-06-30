import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import ItemModel from "../models/item";
import { assertIsDefined } from "../util/assertIsDefined";

export const getItems: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const items = await ItemModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};



export const getItem: RequestHandler = async (req, res, next) => {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(itemId)) {
            throw createHttpError(400, "Invalid Item Id");
        }

        const item = await ItemModel.findById(itemId).exec();

        if (!item) {
            throw createHttpError(404, "Item not found");
        }

        if (!item.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Item");
        }

        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};


interface CreateItemBody {
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
export const createItem: RequestHandler<unknown, unknown, CreateItemBody, unknown> = async (req, res, next) => {
    const isDone = req.body.isDone;
    const content = req.body.content;
    const createDate = req.body.createDate;
    const authenticatedUserId = req.session.userId;


    try {
        // console.log('Creating new item with data:', { userId: authenticatedUserId, isDone, content, createDate });
        assertIsDefined(authenticatedUserId);
        if (!content) {
            throw createHttpError(400, "Must include Content");
        }
     
        const newItem = await ItemModel.create( {
            userId: authenticatedUserId,
            isDone: isDone,
            content: content,
            createDate: createDate,
        });
        res.status(200).json(newItem);
    } catch (error) {
        next(error);
    }

};

export const completeItem: RequestHandler = async(req, res, next) => {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;
    console.log(itemId);

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(itemId)) {
            throw createHttpError(400, "Invalid Item Id");
        }
        const item = await ItemModel.findById(itemId).exec();

        if (!item) {
            throw createHttpError(400, "Item Not Found");
        }

        if (!item.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Item");
        }

        const result = await ItemModel.updateOne(
            {_id: itemId},
            {$set : {isDone: true}}
        );
        res.status(200).json(result);
    } catch (error) {
        next(error);
    };
}


export const deleteItem: RequestHandler = async(req, res, next) => {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(itemId)) {
            throw createHttpError(400, "Invalid Item Id !");
        }
        const item = await ItemModel.findById(itemId).exec();

        if (!item) {
            throw createHttpError(400, "Item not found!"); 
        }

        if (!item.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Item");
        }

        await item.deleteOne();
        res.status(200).json({ message: "Successfully Delete Item" });

    } catch (error) {
        next(error);
    }
};
