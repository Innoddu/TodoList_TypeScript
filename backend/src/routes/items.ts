import express from "express";
import * as ItemController from "../controllers/items";

const router = express.Router();

router.get("/", ItemController.getItems);

router.post("/", ItemController.createItem);

router.patch("/:itemId", ItemController.completeItem);

router.delete("/:itemId", ItemController.deleteItem);



export default router;