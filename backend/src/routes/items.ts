import express from "express";
import * as ItemController from "../controllers/items";

const router = express.Router();

router.get("/", ItemController.getItems);

router.post("/", ItemController.createItems);

router.patch("/:itemId", ItemController.completeItem);

router.post("/:itemId", ItemController.deleteItem);



export default router;