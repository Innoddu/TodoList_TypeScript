import express from "express";
import * as ItemController from "../controllers/items";

const router = express.Router();

router.get("/", ItemController.getItems);

router.post("/", ItemController.createItems);

export default router;