import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import { calcDaysByYear } from "../calc/calcDays.js";
import { getLastAuthor } from "../models/authorsModels/getAuthorsModel.js";

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

    // GET LAST AUTHOR DATA
    const lastAuthor = await getLastAuthor();

    // FORMATTING THE BODY OF THE EMAIL TO BE SENT
    const htmlContent = `
      <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frase do Dia</title>
    <style>
        /* Importando as fontes */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@400;700&display=swap');

        :root {
            --primary-color: #1f1f1f;
            --secondary-color: #f0f0f0;
            --accent-color: #ff6f61;
            --background-color: #ffffff;
            --text-color: #1f1f1f;
            --heading-color: #0d0d0d;
            --card-bg-color: #ffffff;
            --card-border-color: #e0e0e0;
            --modal-bg-color: #2b2b2b;
            --modal-text-color: #ffffff;
            --footer-color: #2b2b2b; /* Cor do fundo do footer */
            --button-color: #ffffff; /* Cor do texto do botão */
            --link-color: #007bff; /* Cor dos links */
        }

        body {
            background-color: var(--primary-color);
            color: var(--secondary-color);
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h2 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .content p {
            font-size: 20px;
            line-height: 1.6;
            color: #555555;
            text-align: center;
            margin: 20px 0;
        }

        .section-divider {
            margin: 40px 0;
            border: none;
            border-top: 1px solid #eeeeee;
        }

        .author-section {
            background-color: #2b2b2b;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px;
        }

        .author-section h3 {
            font-size: 20px;
            margin-bottom: 15px;
            color: #ffffff;
            text-align: center;
        }

        .author-section p {
            font-size: 18px;
            line-height: 1.6;
            color: #ffffff;
            text-align: center;
            margin: 20px 0;
        }

        .author-section img {
            display: block;
            margin: 20px auto;
            max-width: 200px;
            border-radius: 8px;
        }

        .author-section a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }

        .author-section a:hover {
            text-decoration: underline;
        }

        .footer-text {
            text-align: center;
            font-size: 12px;
            color: #cccccc;
        }

        .invitation {
            text-align: center;
            margin: 40px 0;
            font-size: 18px;
        }

        .invitation a {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
        }

        .invitation a:hover {
            text-decoration: underline;
        }

        .additional-content {
            margin: 40px 0;
            text-align: center;
            font-size: 16px;
            color: #333333;
        }

        .additional-content a {
            margin: 40px 0;
            text-align: center;
            font-size: 16px;
            color: var(--accent-color);
            text-decoration: none;
        }

        .additional-content a:hover {
            text-decoration: underline;
        }

        .reminder {
            text-align: center;
            margin: 20px 0;
            font-size: 18px;
            color: var(--accent-color);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Frase do Dia - Day ${dayOfYear}/365</h2>
        </div>
        <div class="content">
            <p>${text}</p>
        </div>
        <hr class="section-divider">
        
        <div class="author-section">
            <h3>Sobre o Autor</h3>
            <p>${lastAuthor.summaryBiographical || "Não disponível."}</p>
            ${lastAuthor.imageThumbnail ? `<img src="${lastAuthor.imageThumbnail}" alt="${lastAuthor.nameAuthor}">` : ''}
            <p>
                <a href="${lastAuthor.informationLink}">Leia mais sobre ${lastAuthor.nameAuthor} na Wikipedia</a>
            </p>
        </div>
        <hr class="section-divider">
        <div class="invitation">
            <p>Gostou da frase de hoje? Visite nosso site para mais frases inspiradoras e conteúdos exclusivos!</p>
            <a href="https://suasfrases.vercel.app/" target="_blank">Acesse o site do Suas Frases Diárias </a>
        </div>
        <div class="additional-content">
            <p>Além das frases diárias, explore:</p>
            <ul style="list-style: none; padding: 0;">
                <li><a href="https://suasfrases.vercel.app/citacoes">Frases por Tema</a></li>
                <li><a href="https://suasfrases.vercel.app/biografias">Sobre os Autores</a></li>
            </ul>
        </div>
        <hr class="section-divider">
        <div class="reminder">
            <p>Nos vemos amanhã as 8:00hrs, direto da sua caixa de emails. Saudações, da sua Newsletter de frases e citações favorita! 😊</p>
        </div>
        <p style="text-align: center; font-size: 14px; color: #999999;">Receba uma frase inspiradora todos os dias!</p>
        <hr class="section-divider">
        <p class="footer-text">Você está recebendo este e-mail porque se inscreveu no serviço Frases Diárias.</p>
    </div>
</body>
</html>
    `;

    // MAKE A MAP OF ALL RECIPIENT EMAILS CONTAINED IN THE .ENV FILE
    const messages = recipients.map((recipient) => ({
      From: {
        Email: sender,
        Name: "Frases Diárias",
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

    const response = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: messages,
    });

    console.log("Email sent successfully:", response.body);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { apiEmail };
