const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyByCX2MbBweVqrm8Fjw63ZmzLHJVQZ6IPo');

async function generateUniversities(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const detailedPrompt = `
        Based on the following answers, provide a list of three specific Tunisian faculties that match the student's preferences. 
        Include the percentage of compatibility and a brief explanation for each faculty.
        Answers: ${prompt}
        
        Please ensure to provide:
        1. Faculty Name
        2. Compatibility Percentage
        3. Brief Explanation
    `;
    const result = await model.generateContent(detailedPrompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    return text;
}

module.exports = { generateUniversities };