import { apiEmail } from "../api/apiEmail.js";
import { getPhrases } from "../api/apiPhrases.js";
import { getEmails } from "../models/emailsModels/getEmailsModel.js";
import dotenv from 'dotenv';

dotenv.config();

const sendMessageEmail = async () => {
    try {

        // Se não houver citação registrada para hoje, prossegue com o envio do email
        const emailMessage = await getPhrases();
        //const emails = await getEmails();
        const emails = process.env.RECEIVER_EMAIL_TEST.split(',');
        const emailSubject = 'Sua Frase diária acabou de chegar! 📕';
        const sender = process.env.SENDER_EMAIL;

        // PASSING THE EMAIL LIST PLUS PARAMETERS TO THE APIEMAIL FUNCTION
        await apiEmail(sender, emails, emailSubject, emailMessage);

        console.log('Message sent successfully!');

    } catch (error) {
        console.error('Error sending message!', error);
        throw error;
    }
};

export { sendMessageEmail };