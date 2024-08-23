import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import { calcDaysByYear } from "../calc/calcDays.js";

dotenv.config();

// ACCESSING ENVIRONMENTAL VARIABLES TO CONNECT WITH THE EMAILS API
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

// FUNCTION TO FORMAT THE EMAIL AND USE THE MAILJET API TO SEND EMAILS
const apiEmail = async (sender, recipients, subject, text) => {
  try {
    const dayOfYear = await calcDaysByYear();

      // FORMATTING THE BODY OF THE EMAIL TO BE SENT
      const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="padding: 40px 0; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333333; text-align: center;">Frase do Dia - Day ${dayOfYear}/365</h2>
              <p style="font-size: 18px; line-height: 1.6; color: #555555; text-align: center; margin: 20px 0;">${text}</p>
              <p style="text-align: center; font-size: 14px; color: #999999;">Receba uma frase inspiradora todos os dias!</p>
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #eeeeee;">
              <p style="text-align: center; font-size: 12px; color: #cccccc;">Você está recebendo este e-mail porque se inscreveu no serviço Frases Diárias.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // MAKE A MAP OF ALL RECIPIENT EMAILS CONTAINED IN THE .ENV FILE
    const messages = recipients.map((recipient) => ({
      From: {
        Email: sender,
        Name: 'Frases Diárias',
      },
      To: [
        {
          Email: recipient,
        },
      ],
      Subject: subject,
      TextPart: text,
      HTMLPart: htmlContent,
    }));

    const response = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: messages,
    });

    console.log('Email sent successfully:', response.body);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export { apiEmail };