import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "rules.json");

let knowledgeBase;
try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    knowledgeBase = JSON.parse(rawData);

    if (!knowledgeBase.rules || !knowledgeBase.genres) {
        throw new Error("rules.json is missing required keys (rules, genres)");
    }
} catch (error) {
    console.error("Error reading rules.json:", error);
    knowledgeBase = { rules: {}, genres: {} };
}

export default knowledgeBase;

export const inferMovie = (userAnswers) => {
    if (!userAnswers || typeof userAnswers !== "object") {
        console.error("Invalid userAnswers provided:", userAnswers);
        return null;
    }

    let bestMatch = null;
    let maxMatches = 0;

    for (const [genreCode, rules] of Object.entries(knowledgeBase.rules)) {
        let matches = 0;
        let totalQuestions = Object.keys(rules).length;

        Object.entries(rules).forEach(([question, expectedAnswer]) => {
            if (userAnswers.hasOwnProperty(question) && userAnswers[question] === expectedAnswer) {
                matches++;
            }
        });

        let matchPercentage = matches / totalQuestions;

        if (matchPercentage > 0.5 && knowledgeBase.genres[genreCode]) {
            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = genreCode;
            }
        }
    }

    if (!bestMatch) {
        return {
            suggestedGenres: Object.values(knowledgeBase.genres)
        };
    }

    return {
        genre: knowledgeBase.genres[bestMatch]
    };
};
