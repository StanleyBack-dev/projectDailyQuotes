import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import { calcDaysByYear } from "../calc/calcDays.js";
import { getLastAuthor } from "../models/authorsModels/getAuthorsModel.js";

dotenv.config();

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
);

const apiEmail = async (sender, recipients, subject, text, reflection, challenge, story, curiosity) => {
    try {
        const dayOfYear = await calcDaysByYear();
        const lastAuthor = await getLastAuthor();

        const htmlContent = `
        <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Frase do Dia</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@400;700&display=swap');

            body {
                background-color: #ffffff;
                color: #1f1f1f;
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
                font-size: 18px; /* Aumentando o tamanho da fonte geral */
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
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
                font-size: 28px; /* Aumentando o tamanho da fonte */
                margin-bottom: 20px;
            }

            .content {
                background-color: #f7f7f7;
                padding: 20px;
                border-radius: 8px;
                font-family: 'Merriweather', serif;
                color: #333333;
            }

            .content p {
                font-size: 22px; /* Aumentando o tamanho da citação */
                line-height: 1.6;
                text-align: center;
                margin: 20px 0;
            }

            .section-divider {
                margin: 40px 0;
                border: none;
                border-top: 1px solid #eeeeee;
            }

            .author-section {
                background-color: #000000;
                color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .author-section h3 {
                font-size: 26px; /* Destacando o nome do autor */
                margin-bottom: 15px;
                color: #0056b3; /* Azul para o nome do autor */
            }

            .author-section p {
                font-size: 18px;
                line-height: 1.6;
                margin: 20px 0;
            }

            .author-section img {
                display: block;
                margin: 20px auto;
                max-width: 200px;
                border-radius: 8px;
            }

            .author-section a {
                color: #0056b3;
                text-decoration: underline;
            }

            .additional-content {
                margin: 40px 0;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .additional-content h3 {
                font-size: 24px; /* Maior destaque para os títulos */
                margin-bottom: 20px;
                color: #3399ff; /* Azul claro */
                font-weight: 600;
            }

            .additional-content p {
                font-size: 18px;
                line-height: 1.6;
                margin: 10px 0;
                padding: 15px;
                background-color: #f0f8ff; /* Cor clara de fundo para cada tópico */
                border-radius: 5px;
                transition: background-color 0.3s;
            }

            .additional-content p:hover {
                background-color: #e6f7ff;
            }

            .button {
                display: inline-block;
                background-color: #0056b3; /* Azul mais escuro para os botões */
                color: #ffffff;
                padding: 12px 20px;
                margin: 10px 0;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s, color 0.3s;
                font-size: 16px;
            }

            .button:hover {
                background-color: #003d82;
            }

            .invitation {
                text-align: center;
                margin: 40px 0;
                font-size: 18px;
            }

            .invitation h3 {
                font-size: 24px; /* Estilo igual ao título "Além das frases diárias, explore:" */
                color: #3399ff;
                font-weight: 600;
                margin-bottom: 20px;
            }

            .invitation a {
                display: inline-block;
                background-color: #0056b3;
                color: #ffffff;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s;
                font-size: 16px;
            }

            .invitation a:hover {
                background-color: #003d82;
            }

            .footer-text {
                text-align: center;
                font-size: 14px;
                color: #cccccc;
                margin-top: 20px;
            }

            .reminder {
                text-align: center;
                margin: 20px 0;
                font-size: 18px;
                color: #000000;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h2>Frase do Dia - Day ${dayOfYear}/365 📕</h2>
            </div>
            <div class="content">
                <p>${text} 🧠</p>
            </div>
            <hr class="section-divider">

            <div class="author-section">
                <h3>${lastAuthor.nameAuthor}</h3> <!-- Nome do autor em azul destacado -->
                <p>${lastAuthor.summaryBiographical || "Não disponível."}</p>
                ${lastAuthor.imageThumbnail ? `<img src="${lastAuthor.imageThumbnail}" alt="${lastAuthor.nameAuthor}">` : ''}
                <p>
                    <a href="${lastAuthor.informationLink}" style="color: #0056b3;">Leia mais sobre ${lastAuthor.nameAuthor} na Wikipedia</a>
                </p>
            </div>

            <hr class="section-divider">

            <div class="additional-content">
                <h3>Explorações Inspiradoras 🔎</h3>
                <p><strong>Reflexão:</strong> ${reflection || "Não disponível."}</p>
                <p><strong>Desafio:</strong> ${challenge || "Não disponível."}</p>
                <p><strong>História:</strong> ${story || "Não disponível."}</p>
                <p><strong>Curiosidade:</strong> ${curiosity || "Não disponível."}</p>
            </div>

            <hr class="section-divider">
            <div class="invitation">
                <h3>Gostou da frase de hoje? Visite nosso site para mais frases inspiradoras e conteúdos exclusivos!</h3> <!-- Estilo ajustado -->
                <a href="https://suasfrases.vercel.app/" target="_blank" class="button">Acesse o site do Suas Frases Diárias</a>
            </div>

            <div class="additional-content">
                <h3>Além das frases diárias, explore:</h3>
                <a href="https://suasfrases.vercel.app/citacoes" class="button">➕ Citações</a>
                <a href="https://suasfrases.vercel.app/biografias" class="button">➕ Autores</a>
            </div>

            <hr class="section-divider">

            <div class="reminder">
                <p>Nos vemos amanhã às 8:00hrs, direto da sua caixa de emails. Saudações, da sua Newsletter de frases e citações favorita! 😊</p>
            </div>

            <p class="footer-text">Você está recebendo este e-mail porque se inscreveu no serviço Frases Diárias.</p>
            
            <hr class="section-divider">

            
            <p class="footer-text">© 2024 Suas Frases Diárias. Todos os direitos reservados.</p> 
        </div>
        </body>
        </html>`;

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