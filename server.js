import express from "express";
import cors from "cors";
import { getMovieRecommendation } from "./src/services/MovieRecommendation.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/recommend", async (req, res) => {
    try {
        const { userAnswers, filters } = req.body;

        if (!userAnswers || !filters) {
            return res.status(400).json({ message: "Invalid request. 'userAnswers' and 'filters' are required." });
        }

        const recommendedMovie = getMovieRecommendation(userAnswers, filters);
        return res.json(recommendedMovie);
    } catch (error) {
        console.error("Error processing recommendation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
