import { apiEmail } from "../api/apiEmail.js";
import { getPhrases } from "../api/apiPhrases.js";
import { getEmails } from "../models/emailsModels/getEmailsModel.js";
import { getLastQuote } from "../models/quotesModels/getQuotesModel.js";
import dotenv from 'dotenv';

dotenv.config();

// FUNCTION TO SEND THE PHRASE TO RECIPIENTS’ EMAIL
const sendMessageEmail = async () => {
    try {
        // Verifica se já existe uma citação registrada para hoje
        const lastQuote = await getLastQuote();
        if (lastQuote) {
            console.log("Já existe uma citação registrada para hoje. Email não será enviado.");
            return;
        }

        // Se não houver citação registrada para hoje, prossegue com o envio do email
        const emailMessage = await getPhrases();
        const emails = await getEmails(); // Descomente se quiser pegar emails do banco
        //const emails = process.env.RECEIVER_EMAIL_TEST.split(','); // Usando emails do arquivo .env
        const emailSubject = 'Sua Frase diária acabou de chegar! 📕';
        const sender = process.env.SENDER_EMAIL;

        // PASSING THE EMAIL LIST PLUS PARAMETERS TO THE APIEMAIL FUNCTION
        await apiEmail(sender, emails, emailSubject, emailMessage);

        console.log('Message sent successfully!');

    } catch (error) {
        console.error('Error sending message!', error);
        throw error;
    }
}

export { sendMessageEmail };