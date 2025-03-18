import path from "path";
import fs from "fs";
import { inferGenre } from "../inference/InferenceEngine.js";
import { applyFilters } from "../inference/Filters.js";

const filePath = path.join(process.cwd(), "src", "rules.json");

let knowledgeBase;
try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    knowledgeBase = JSON.parse(rawData);

    if (!knowledgeBase.rules || !knowledgeBase.genres || !knowledgeBase.movies) {
        throw new Error("rules.json is missing required keys");
    }
} catch (error) {
    console.error("Error reading rules.json:", error);
    knowledgeBase = { rules: {}, genres: {}, movies: [] };
}

export const getMovieRecommendation = (userAnswers, filters) => {
    try {
        if (!userAnswers || !filters) {
            return { message: "Invalid request. 'userAnswers' and 'filters' are required.", movie: null };
        }

        const recommendation = inferGenre(userAnswers);
        if (!recommendation || !recommendation.genre) {
            return {
                message: "No matching genre found.",
                suggestedGenres: Object.values(knowledgeBase.genres),
                movie: null
            };
        }

        let movies = knowledgeBase.movies.filter(movie =>
            movie.genre.split(',').map(g => g.trim().toLowerCase()).includes(recommendation.genre.toLowerCase())
        );

        movies = applyFilters(movies, filters);

        if (!movies || movies.length === 0) {
            return { message: "No movies found for the selected genre and filters.", movie: null };
        }

        return {
            genre: recommendation.genre,
            movie: movies[0]
        };
    } catch (error) {
        console.error("Error in getMovieRecommendation:", error);
        return { message: "Error generating recommendation.", movie: null };
    }
};
