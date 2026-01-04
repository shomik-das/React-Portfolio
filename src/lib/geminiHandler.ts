import { GoogleGenAI } from "@google/genai";
import { prompt } from "../Prompts/developerPrompts";

const ai = new GoogleGenAI({
    apiKey: "ddddddddd", // Replace with your actual API key
});


export const getGeminiResponse = async (userMessage: string) => {
    async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userMessage,
            config: {
                systemInstruction: prompt,
            },
        });
        return response.text;
    }

    return await main();
}