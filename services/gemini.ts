import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private modelId = 'gemini-2.5-flash';

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    }
  }

  public async *streamResponse(message: string, history: {role: string, parts: {text: string}[]}[]): AsyncGenerator<string, void, unknown> {
    if (!this.ai) {
      yield "System: API Key not configured.";
      return;
    }

    try {
      const chat = this.ai.chats.create({
        model: this.modelId,
        config: {
          systemInstruction: `You are "The Weaver," a helpful assistant for CoopOx. 
          CoopOx is software that helps cooperatives manage their money. You are NOT the cooperative itself, but the tool they use.
          Your tone is warm and helpful.
          Use simple words. Avoid jargon.
          Occasionally use "weaving" or "thread" metaphors, but keep it very easy to understand.
          Keep responses concise (under 80 words).`,
        },
        history: history.map(h => ({ role: h.role, parts: h.parts })),
      });

      const result = await chat.sendMessageStream({ message });

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      yield "I'm having a little trouble connecting right now. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();