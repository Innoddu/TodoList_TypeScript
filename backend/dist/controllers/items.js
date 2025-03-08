"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.completeItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const item_1 = __importDefault(require("../models/item"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const getItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        const items = yield item_1.default.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(items);
    }
    catch (error) {
        next(error);
    }
});
exports.getItems = getItems;
const getItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            throw (0, http_errors_1.default)(400, "Invalid Item Id");
        }
        const item = yield item_1.default.findById(itemId).exec();
        if (!item) {
            throw (0, http_errors_1.default)(404, "Item not found");
        }
        if (!item.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this Item");
        }
        res.status(200).json(item);
    }
    catch (error) {
        next(error);
    }
});
exports.getItem = getItem;
// RequestHandler<unknown, unknown, CreateItemBody, unknown>:
// I don't use 1,3, and 4 part so it define as unkown
// 1. req.params => unkown
// 2. req.send() => unkown
// 3. req.body => define the type of body using interface that I created above
// 4. req.query => unkown
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isDone = req.body.isDone;
    const content = req.body.content;
    const createDate = req.body.createDate;
    const authenticatedUserId = req.session.userId;
    try {
        // console.log('Creating new item with data:', { userId: authenticatedUserId, isDone, content, createDate });
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!content) {
            throw (0, http_errors_1.default)(400, "Must include Content");
        }
        const newItem = yield item_1.default.create({
            userId: authenticatedUserId,
            isDone: isDone,
            content: content,
            createDate: createDate,
        });
        res.status(200).json(newItem);
    }
    catch (error) {
        next(error);
    }
});
exports.createItem = createItem;
const completeItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;
    console.log(itemId);
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            throw (0, http_errors_1.default)(400, "Invalid Item Id");
        }
        const item = yield item_1.default.findById(itemId).exec();
        if (!item) {
            throw (0, http_errors_1.default)(400, "Item Not Found");
        }
        if (!item.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this Item");
        }
        const result = yield item_1.default.updateOne({ _id: itemId }, { $set: { isDone: true } });
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.completeItem = completeItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            throw (0, http_errors_1.default)(400, "Invalid Item Id !");
        }
        const item = yield item_1.default.findById(itemId).exec();
        if (!item) {
            throw (0, http_errors_1.default)(400, "Item not found!");
        }
        if (!item.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this Item");
        }
        yield item.deleteOne();
        res.status(200).json({ message: "Successfully Delete Item" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
