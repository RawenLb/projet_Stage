const { GoogleGenerativeAI } = require("@google/generative-ai");

// Définissez votre clé API ici ou utilisez une variable d'environnement
const genAI = new GoogleGenerativeAI('AIzaSyByCX2MbBweVqrm8Fjw63ZmzLHJVQZ6IPo');

async function generateUniversities(prompt) {
    // Le modèle Gemini 1.5 fonctionne avec des prompts uniquement textuels et multimodaux
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Générer le contenu à partir du prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text); // Afficher le texte généré pour le débogage
    return text;
}

module.exports = { generateUniversities };
