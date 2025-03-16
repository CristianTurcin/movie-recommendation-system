import fs from "fs";
import path from "path";

const filePath = path.resolve("src/rules.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const knowledgeBase = JSON.parse(rawData);

export default knowledgeBase;

import { inferMovie } from "../utils/inference.js";
import { applyFilters } from "../utils/filters.js";

export const recommendMovie = (req, res) => {
    const userAnswers = req.body.answers;
    const filters = req.body.filters;

    const recommendation = inferMovie(userAnswers);
    if (!recommendation.genre) {
        return res.json({ message: "No matching genre found.", movie: null });
    }

    let movies = knowledgeBase.movies.filter(movie =>
        movie.genre.toLowerCase().split(', ').includes(recommendation.genre.toLowerCase())
    );

    movies = applyFilters(movies, filters);

    if (movies.length === 0) {
        return res.json({ message: `No movies found for genre ${recommendation.genre} with selected filters.`, movie: null });
    }

    const selectedMovie = movies[Math.floor(Math.random() * movies.length)];

    res.json({
        genre: recommendation.genre,
        movie: {
            title: selectedMovie.title,
            year: selectedMovie.year,
            rating: selectedMovie.imdbrating,
            duration: selectedMovie.runtime,
            language: selectedMovie.language,
            description: selectedMovie.plot,
            poster: selectedMovie.poster
        }
    });
};
