import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import Feedback from '../models/feedbackSchema.js';
import { convertAnswersToText, writeDataToFile } from '../fileUtils.js';
import gemini from '../../gemini.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { generateUniversities } = gemini;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const storeFeedback = async (req, res) => {
    try {
        const { userId, rating } = req.body;
        if (!userId || rating == null) {
            throw new Error('Incomplete data provided.');
        }

        await Feedback.create({ userId, rating });
        res.json({ msg: "Feedback saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const storeFeedbacks = async (req, res) => {
    try {
        const { userId, feedback, type } = req.body;
        console.log('Received data:', { userId, feedback, type });

        if (!userId || !feedback || !type) {
            throw new Error('Incomplete data provided.');
        }

        await Feedback.create({ userId, feedback, type });
        res.json({ msg: "Feedback saved successfully!" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getRatingsStats = async (req, res) => {
    try {
        const ratings = await Feedback.aggregate([
            { $group: { _id: "$rating", count: { $sum: 1 } } }
        ]);

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertQuestions = async (req, res) => {
    try {
        const { question, options } = req.body;
        const newQuestion = new Question({ question, options });
        await newQuestion.save();

        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        questionsData.push({ id: newQuestion._id, question, options });
        fs.writeFileSync(questionsFilePath, JSON.stringify(questionsData, null, 2));

        const dataFilePath = path.join(__dirname, '../database/data.js');
        let dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        const newQuestionString = `
            {
                id: "${newQuestion._id}",
                question: "${question}",
                options: ${JSON.stringify(options)}
            }
        `;
        dataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = `${p2.trim()},${newQuestionString}\n`;
            return `${p1}${questionsArrayString}${p3}`;
        });
        fs.writeFileSync(dataFilePath, dataFileContent);

        res.json({ msg: 'Question added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await Question.findByIdAndDelete(id);

        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        const updatedQuestionsData = questionsData.filter(question => question.id !== id);
        fs.writeFileSync(questionsFilePath, JSON.stringify(updatedQuestionsData, null, 2));

        const dataFilePath = path.join(__dirname, '../database/data.js');
        let dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        dataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = p2.trim().split('\n').filter(line => !line.includes(id)).join('\n');
            return `${p1}${questionsArrayString}\n${p3}`;
        });
        fs.writeFileSync(dataFilePath, dataFileContent);

        res.json({ msg: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, options } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(id, { question, options }, { new: true });

        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        const updatedQuestionsData = questionsData.map(q => q.id === id ? { id, question, options } : q);
        fs.writeFileSync(questionsFilePath, JSON.stringify(updatedQuestionsData, null, 2));

        const dataFilePath = path.join(__dirname, '../database/data.js');
        let dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        dataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = p2.trim().split('\n').map(line => {
                if (line.includes(id)) {
                    return `{ id: "${id}", question: "${question}", options: ${JSON.stringify(options)} }`;
                }
                return line;
            }).join('\n');
            return `${p1}${questionsArrayString}\n${p3}`;
        });
        fs.writeFileSync(dataFilePath, dataFileContent);

        res.json({ msg: 'Question updated successfully', updatedQuestion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const dropQuestions = async (req, res) => {
    try {
        await Question.deleteMany();
        res.json({ msg: 'Questions deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getResult = async (req, res) => {
    try {
        const results = await Result.find();
        const modifiedResults = results.map(result => ({
            _id: result._id,
            username: result.username,
            geminiResult: result.answers.find(answer => typeof answer === 'object' && answer !== null && 'answer' in answer && answer.answer.includes('facultés basées'))
        }));
        res.json(modifiedResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await Result.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTotalQuestions = async (req, res) => {
    try {
        const totalQuestions = await Question.countDocuments();
        res.json({ totalQuestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const storeResult = async (req, res) => {
    try {
        const { username, answers } = req.body;
        if (!username || !answers) {
            throw new Error('Incomplete data provided.');
        }

        const convertedAnswers = convertAnswersToText(answers);
        const prompt = `Student preferences based on answers: ${JSON.stringify(convertedAnswers)}`;

        let universities;
        try {
            universities = await generateUniversities(prompt);
        } catch (error) {
            universities = "Impossible de générer des facultés basées sur vos réponses.";
        }

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
};

export const deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        await Result.findByIdAndDelete(id);
        res.json({ msg: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
