import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Model initialization
const MODEL_NAME = "gemini-1.5-flash";
// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);
const model = configuration.getGenerativeModel({
    model:MODEL_NAME,
    systemInstruction: {
        parts: [{text:'You are a chat bot very knowledgeable about foods and cusines.'}],
        role:"model"
    }
});
let chat = null, history = [];

async function callGemini(text) {

	if(!chat) {
		chat = model.startChat({
			history: []
		});
	}

	const result = await chat.sendMessage(text);
	return result.response.text();

}

// Controller function to handle chat conversation
export async function generateResponse(req, res) {
    console.log('Entered handler.:', req.method, req.url, req.body);
    let { prompt } = req.body;
    let result = await callGemini(prompt);
    console.log('result:', result);
    history.push({role:"user", parts:[{text: prompt}]});
    history.push({role:"model", parts:[{text: result}]});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(history));
    res.end();
}