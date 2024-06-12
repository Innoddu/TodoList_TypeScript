import {model, InferSchemaType, Schema} from "mongoose";

const itemSchema = new Schema( {
    complete: {type: Boolean },
    content: { type: String, required: true },
}, {timestamps: true});

type Item = InferSchemaType<typeof itemSchema>;

export default model<Item>("Item", itemSchema);