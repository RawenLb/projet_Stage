import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import { writeDataToFile } from '../fileUtils.js';
import { generateUniversities } from '../../gemini.js';

async function fetchUniversitiesByResponses(candidateAnswers) {
    let prompt = "Based on the following answers, generate a list of 5 Tunisian universities with percentages\n";
    prompt += JSON.stringify(candidateAnswers);

    const universitiesData = await generateUniversities(prompt);
    return universitiesData;
}

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
        res.json({ msg: "Questions Deleted Successfully...!"});
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

        const results = await fetchUniversitiesByResponses(answers);

        const resultData = { username, answers: results };
        await Result.create(resultData);

        await writeDataToFile('results.json', resultData);

        res.json({ msg: "Result Saved Successfully!" });
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
