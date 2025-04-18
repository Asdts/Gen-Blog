import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API || '' );

const model = genAI.getGenerativeModel({ model :process.env.GOOGLE_MODEL || 'gemini-2.0-flash'});

const llm = async (prompt:any) => {
    return await model.generateContent(prompt);
}

export default llm;