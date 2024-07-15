const { GoogleGenerativeAI } = require("@google/generative-ai");

// Définissez votre clé API ici ou utilisez une variable d'environnement
const genAI = new GoogleGenerativeAI('AIzaSyBgYV7CxN0XXGJ_HDWmSVh1XRNrpcGWk7o');

async function generateUniversities(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = {
    generateUniversities
};
