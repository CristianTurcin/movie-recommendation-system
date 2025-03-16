import fs from "fs";
import path from "path";

const filePath = path.resolve("src/rules.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const knowledgeBase = JSON.parse(rawData);

export default knowledgeBase;


export const inferMovie = (userAnswers) => {
    let matchedGenre = null;
    for (const [genre, rules] of Object.entries(knowledgeBase.rules)) {
        let isMatch = true;
        for (const [question, expectedAnswer] of Object.entries(rules)) {
            if (userAnswers[question] !== expectedAnswer) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) {
            matchedGenre = knowledgeBase.genres[genre];
            break;
        }
    }
    return { genre: matchedGenre };
};
