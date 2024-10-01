import { apiEmail } from "../api/apiEmail.js";
import { getPhrases } from "../api/apiPhrases.js";
import { sendPromptToCohere } from '../api/apiCohere.js'; 
import { getEmails } from "../models/emailsModels/getEmailsModel.js";
import dotenv from 'dotenv';

dotenv.config();

const sendMessageEmail = async () => {
    try {
        const result = await getPhrases();
        if (!result) {
            throw new Error("Erro ao obter a frase."); 
        }

        const { quote, author } = result; 
        const cohereContent = await sendPromptToCohere(author);
        if (!cohereContent) {
            throw new Error("Conteúdo gerado pela Cohere está vazio.");
        }

        const emails = await getEmails();
        //const emails = process.env.RECEIVER_EMAIL_TEST.split(',');
        const emailSubject = 'Sua Frase diária acabou de chegar! 📕';
        const sender = process.env.SENDER_EMAIL;
        const quotes = `"${quote}"\n- ${author}`;
        
        // Extraindo cada tópico do objeto cohereContent
        const { reflection, challenge, story, curiosity } = cohereContent;

        // Chamando a API de email com cada tópico separado
        await apiEmail(sender, emails, emailSubject, quotes, reflection, challenge, story, curiosity);
        
        console.log('Message sent successfully!');

    } catch (error) {
        console.error('Error sending message!', error.message || error);
        throw error;
    }
};

export { sendMessageEmail };