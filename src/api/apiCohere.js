import dotenv from 'dotenv';
import { CohereClient } from "cohere-ai";

dotenv.config();

// Função para enviar a solicitação à API da Cohere
const sendPromptToCohere = async (author) => {
    const apiKey = process.env.API_KEY_COHERE;

    const prompt = `
    Autor: ${author}

    1. Reflexão do dia (curta) sobre o autor.
    2. Um desafio do dia relacionado ao autor.
    3. Uma história inspiradora sobre o autor.
    4. Uma curiosidade a respeito do autor.

    Observação: Me forneça somente os tópicos por paragrafos, sem numereção e sem títulos nenhum. Somente o texto de cada tópico mesmo.
    `;

    try {
        const cohere = new CohereClient({
            token: apiKey,
        });

        // Envio da mensagem para a API
        const response = await cohere.chat({
            message: prompt,
        });

        // Extraindo o texto gerado pela API
        const text = response.text.trim();

        // Dividindo o texto em linhas e criando um objeto
        const lines = text.split('\n').map(line => line.trim()).filter(line => line); // Remove linhas vazias

        const formattedResponse = {
            reflection: lines[0] || '',
            challenge: lines[1] || '',
            story: lines[2] || '',
            curiosity: lines[3] || '',
        };

        // Retorna o objeto com os dados formatados
        return formattedResponse;

    } catch (error) {
        console.error('Erro ao solicitar à API da Cohere:', error.message);
        throw new Error('Erro ao acessar a API da Cohere');
    }
};

export { sendPromptToCohere };