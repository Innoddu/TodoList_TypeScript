"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    isDone: { type: Boolean, default: false },
    content: { type: String, required: true },
    createDate: { type: Number, default: new Date().getTime() },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Item", itemSchema);
