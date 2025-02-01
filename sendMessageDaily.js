import dotenv from "dotenv";
import { sendMessageEmail } from "./src/sendEmails/sendMessage.js";

dotenv.config();

// MAIN FUNCTION TO SEND EMAILS WITH AUTOMATIC RETRY
async function runEmailJob(attempt = 1) {
    try {
        console.log(`Attempt ${attempt} to send emails...`);

        // CALL THE EMAIL SENDING FUNCTION
        await sendMessageEmail();

        console.log("Emails sent successfully!");
        process.exit(0); // Exit the process if successful

    } catch (error) {
        console.error(`Error sending emails (attempt ${attempt}):`, error.message || error);

        if (attempt < 10) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential delay (1s, 2s, 4s, 8s...)
            console.log(`Retrying in ${delay / 1000} seconds...`);

            setTimeout(() => {
                runEmailJob(attempt + 1);
            }, delay);
        } else {
            console.error("Maximum retry attempts reached. Email sending failed.");
            process.exit(1); // Exit with failure after 5 attempts
        }
    }
}

// EXECUTE THE EMAIL SENDING FUNCTION WITH AUTOMATIC RETRY
runEmailJob();