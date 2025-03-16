const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Serverul rulează!");
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});

const fs = require("fs");

// Citim fișierul o singură dată și stocăm baza de cunoștințe în memorie
let knowledgeBase = null;

const loadKnowledgeBase = () => {
    if (!knowledgeBase) {
        console.log("Încărcare baza de cunoștințe...");
        const data = fs.readFileSync("rules.json", "utf-8");
        knowledgeBase = JSON.parse(data);
    }
    return knowledgeBase;
};

// Apelăm funcția pentru a încărca baza de date la pornirea serverului
loadKnowledgeBase();
console.log("Baza de cunoștințe a fost încărcată!");

const inferMovie = (userAnswers) => {
    const rules = knowledgeBase.rules;
    let matchedGenre = null;

    // Determinăm genul filmului pe baza răspunsurilor utilizatorului
    for (const genre in rules) {
        const conditions = rules[genre];
        if (Object.keys(conditions).every(q => userAnswers[q] === conditions[q])) {
            matchedGenre = knowledgeBase.genres[genre];
            break;
        }
    }

    if (!matchedGenre) {
        return { message: "No matching genre found.", movie: null };
    }

    // Selectăm un film care aparține genului determinat
    const movies = knowledgeBase.movies.filter(movie =>
        movie.genre.toLowerCase().split(', ').includes(matchedGenre.toLowerCase())
    );

    if (movies.length === 0) {
        return { message: `No movies found for genre ${matchedGenre}.`, movie: null };
    }

    // Alegem un film randomizat din lista filmelor disponibile
    const selectedMovie = movies[Math.floor(Math.random() * movies.length)];

    return {
        genre: matchedGenre,
        movie: {
            title: selectedMovie.title,
            year: selectedMovie.year,
            rating: selectedMovie.rating,
            duration: selectedMovie.duration,
            description: selectedMovie.description
        }
    };
};

app.post("/recommend", (req, res) => {
    const userAnswers = req.body;
    const recommendation = inferMovie(userAnswers);

    res.json(recommendation);
});
