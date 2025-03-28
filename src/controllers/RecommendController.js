import express from "express";
import { recommendMovie } from "../services/MovieRecommendation.js";

const router = express.Router();

router.post("/recommend", recommendMovie);

export default router;