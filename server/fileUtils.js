import { promises as fs } from 'fs';
import { questions } from './database/data.js';

async function writeDataToFile(filename, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('Failed to write data to file:', error);
    }
}


export function convertAnswersToText(answers) {
    return answers.map((answer, index) => {
        const question = questions[index];
        if (question) {
            return {
                answer: question.options[answer.answer]
            };
        }
        return answer;
    });
}
export { writeDataToFile };
