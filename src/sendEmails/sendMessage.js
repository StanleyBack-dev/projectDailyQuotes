import { apiEmail } from "../api/apiEmail.js";
import { getPhrases } from "../api/apiPhrases.js";
import { getEmails } from "../models/emailsModels/getEmailsModel.js";
import { getLastQuote } from "../models/quotesModels/getQuotesModel.js";
import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();

// FUNCTION TO SEND THE PHRASE TO RECIPIENTS’ EMAIL
const sendMessageEmail = async () => {
    try {
        // Obtém a hora atual no fuso horário de Brasília
        const currentTime = DateTime.now().setZone('America/Sao_Paulo');
        const startHour = DateTime.fromObject({ hour: 8 }, { zone: 'America/Sao_Paulo' });
        const endHour = DateTime.fromObject({ hour: 9 }, { zone: 'America/Sao_Paulo' });

        // Verifica se a hora atual está dentro do intervalo permitido
        if (currentTime < startHour || currentTime > endHour) {
            console.log("Fora do horário de envio. O email só pode ser enviado entre 8h e 9h da manhã.");
            return;
        }

        // Verifica se já existe uma citação registrada para hoje
        const lastQuote = await getLastQuote();
        if (lastQuote) {
            console.log("Já existe uma citação registrada para hoje. Email não será enviado.");
            return;
        }

        // Se não houver citação registrada para hoje, prossegue com o envio do email
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