import knowledgeBase, { inferMovie } from "../inference/InferenceEngine.js";
import { applyFilters } from "../inference/Filters.js";

export const recommendMovie = (req, res) => {
    const userAnswers = req.body.answers;
    const filters = req.body.filters;

    if (!userAnswers || !filters) {
        return res.status(400).json({ message: "Invalid request. 'answers' and 'filters' are required.", movie: null });
    }

    console.log("User Answers:", userAnswers);
    console.log("Filters:", filters);

    const recommendation = inferMovie(userAnswers);

    if (!recommendation.genre) {
        return res.json({
            message: "No matching genre found.",
            suggestedGenres: Object.values(knowledgeBase.genres),
            movie: null
        });
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