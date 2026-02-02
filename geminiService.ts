
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const editImageWithAI = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: prompt
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Erro ao editar imagem:", error);
    return null;
  }
};

export const generateCommentResponse = async (comment: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é o assistente virtual da EJ TEC. Um cliente comentou: "${comment}". Dê uma resposta curta, profissional e amigável em português.`,
    });
    return response.text || "Obrigado pelo seu comentário!";
  } catch (error) {
    return "Agradecemos o feedback!";
  }
};
