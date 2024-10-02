import dotenv from "dotenv";
import { sendMessageEmail } from "./src/sendEmails/sendMessage.js";

dotenv.config();

// MAIN FUNCTION TO SEND EMAILS
async function runEmailJob() {
  try {
    console.log("Starting to send emails...");

    // CALL THE EMAIL SENDING FUNCTION
    await sendMessageEmail();

    console.log("Sending emails completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error sending emails:", error);
    process.exit(1);
  }
}

// PERFORMS THE EMAIL SENDING FUNCTION
runEmailJob();