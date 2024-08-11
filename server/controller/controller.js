import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import Feedback from '../models/feedbackSchema.js';
import { convertAnswersToText, writeDataToFile } from '../fileUtils.js';
import gemini from '../../gemini.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Updated import statement
import nodemailer from 'nodemailer';
import crypto from 'crypto';



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  export const requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'No account with that email found' });
      }
  
      // Create a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
      await user.save();
  
      // Send email
      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
      await transporter.sendMail({
        to: user.email,
        from: 'noreply@example.com',
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`
      });
  
      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ error: 'Token is invalid or has expired' });
      }
  
      user.password = password;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

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


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
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
