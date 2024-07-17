import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import { convertAnswersToText, writeDataToFile } from '../fileUtils.js';
import gemini from '../../gemini.js';

const { generateUniversities } = gemini;

export async function getQuestions(req, res) {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function insertQuestions(req, res) {
    try {
        await Question.insertMany(req.body);
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function dropQuestions(req, res) {
    try {
        await Question.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getResult(req, res) {
    try {
        const results = await Result.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function storeResult(req, res) {
    try {
        const { username, answers } = req.body;
        if (!username || !answers) {
            throw new Error('Incomplete data provided.');
        }

        // Convertir les indices de réponse en texte
        const convertedAnswers = convertAnswersToText(answers);

        // Générer une liste de facultés basées sur les réponses
        const prompt = `Réponses: ${JSON.stringify(convertedAnswers)}`;
        let universities;
        try {
            universities = await generateUniversities(prompt);
        } catch (error) {
            universities = "Impossible de générer des facultés basées sur vos réponses.";
        }

        // Inclure la réponse de Gemini dans les réponses
        const resultData = { 
            username, 
            answers: [
                ...convertedAnswers,
                { answer: universities }
            ] 
        };
        
        await Result.create(resultData);
        await writeDataToFile('results.json', resultData);

        res.json({ msg: "Result Saved Successfully!", resultData, universities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function dropResult(req, res) {
    try {
        await Result.deleteMany();
        res.json({ msg: "Results Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
