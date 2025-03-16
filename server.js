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


const inferGenre = (userAnswers) => {
    const rules = knowledgeBase.rules;

    // Căutăm direct genul bazat pe combinația de răspunsuri
    for (const genre in rules) {
        const conditions = rules[genre];
        if (Object.keys(conditions).every(q => userAnswers[q] === conditions[q])) {
            return knowledgeBase.genres[genre]; // Returnează genul filmului
        }
    }
    return "No matching genre found.";
};
app.post("/recommend", (req, res) => {
    const userAnswers = req.body;
    const recommendedGenre = inferGenre(userAnswers);

    res.json({ genre: recommendedGenre });
});


