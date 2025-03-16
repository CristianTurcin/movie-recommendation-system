import express from "express";
import { recommendMovie } from "../controllers/recommendController.js";

const router = express.Router();

router.post("/recommend", recommendMovie);

export default router;
