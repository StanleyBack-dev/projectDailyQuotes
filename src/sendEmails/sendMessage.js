import { apiEmail } from "../api/apiEmail.js";
import { getPhrases } from "../api/apiPhrases.js";
import { getEmails } from "../models/getEmailsModel.js";
import dotenv from 'dotenv';

dotenv.config();

// FUNCTION TO SEND THE PHRASE TO RECIPIENTS’ EMAIL
const sendMessageEmail = async () => {
    try {

        // INITIALIZING THE VARIABLES FOR SENDING THE EMAIL
        const emailMessage = await getPhrases();
        const emails = await getEmails();
        //const emails = process.env.RECEIVER_EMAIL_TEST.split(',');
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