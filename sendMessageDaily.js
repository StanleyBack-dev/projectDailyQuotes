import dotenv from "dotenv";
import { sendMessageEmail } from "./src/sendEmails/sendMessage.js";

dotenv.config();

// Função principal para enviar emails
async function runEmailJob() {
  try {
    console.log("Iniciando o envio de emails...");

    // Chama a função de envio de emails
    await sendMessageEmail();

    console.log("Envio de emails concluído.");
    process.exit(0); // Encerra o processo com sucesso
  } catch (error) {
    console.error("Erro no envio de emails:", error);
    process.exit(1); // Encerra o processo com erro
  }
}

// Executa a função de envio de emails
runEmailJob();