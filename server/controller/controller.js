import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import { convertAnswersToText, writeDataToFile } from '../fileUtils.js';
import gemini from '../../gemini.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { generateUniversities } = gemini;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const insertQuestions = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Generate a new question with auto-generated id
        const newQuestion = new Question({
            question,
            options
        });
        await newQuestion.save();

        // Load existing questions from questions.json
        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

        // Add the new question to questions.json
        questionsData.push({ id: newQuestion._id, question, options });

        // Write updated questions to questions.json
        fs.writeFileSync(questionsFilePath, JSON.stringify(questionsData, null, 2));

        // Load existing questions from data.js
        const dataFilePath = path.join(__dirname, '../database/data.js');
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');

        // Add the new question to data.js
        const newQuestionString = `
            {
                id: "${newQuestion._id}",
                question: "${question}",
                options: ${JSON.stringify(options)}
            }
        `;
        const updatedDataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = `${p2.trim()},${newQuestionString}\n`;
            return `${p1}${questionsArrayString}${p3}`;
        });

        fs.writeFileSync(dataFilePath, updatedDataFileContent);

        res.json({ msg: 'Question added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        // Remove from MongoDB
        await Question.findByIdAndDelete(id);

        // Remove from questions.json
        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        const updatedQuestionsData = questionsData.filter(question => question.id !== id);
        fs.writeFileSync(questionsFilePath, JSON.stringify(updatedQuestionsData, null, 2));

        // Remove from data.js
        const dataFilePath = path.join(__dirname, '../database/data.js');
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        const updatedDataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = p2.trim().split('\n').filter(line => !line.includes(id)).join('\n');
            return `${p1}${questionsArrayString}\n${p3}`;
        });
        fs.writeFileSync(dataFilePath, updatedDataFileContent);

        res.json({ msg: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, options } = req.body;

        // Update the question in MongoDB
        const updatedQuestion = await Question.findByIdAndUpdate(id, { question, options }, { new: true });

        // Update in questions.json
        const questionsFilePath = path.join(__dirname, '../questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        const updatedQuestionsData = questionsData.map(q => 
            q.id === id ? { id, question, options } : q
        );
        fs.writeFileSync(questionsFilePath, JSON.stringify(updatedQuestionsData, null, 2));

        // Update in data.js
        const dataFilePath = path.join(__dirname, '../database/data.js');
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        const updatedDataFileContent = dataFileContent.replace(/(export const questions = \[)([\s\S]*?)(\];)/, (match, p1, p2, p3) => {
            const questionsArrayString = p2.trim().split('\n').map(line => {
                if (line.includes(id)) {
                    return `{ id: "${id}", question: "${question}", options: ${JSON.stringify(options)} }`;
                }
                return line;
            }).join('\n');
            return `${p1}${questionsArrayString}\n${p3}`;
        });
        fs.writeFileSync(dataFilePath, updatedDataFileContent);

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

export async function getResult(req, res) {
    try {
        const results = await Result.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
export async function dropResult(req, res) {
    try {
        await Result.deleteMany();
        res.json({ msg: "Results Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
