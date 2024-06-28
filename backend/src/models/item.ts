import { timeStamp } from "console";
import {model, InferSchemaType, Schema} from "mongoose";

const itemSchema = new Schema( {
    userId: { type: Schema.Types.ObjectId, required: true},
    isDone: {type: Boolean,  default: false },
    content: { type: String, required: true },
    createDate: {type: Number,  default: new Date().getTime()},
}, {timestamps: true});

type Item = InferSchemaType<typeof itemSchema>;

export default model<Item>("Item", itemSchema);