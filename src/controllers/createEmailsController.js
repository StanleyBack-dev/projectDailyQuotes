import { createEmails } from './../models/createEmailsModel.js';

// FUNCTION TO REGISTER A NEW EMAIL
const createEmailsController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "O campo de e-mail é obrigatório."
            });
        }

        // CALL THE MODEL FUNCTION TO CREATE THE EMAIL
        const result = await createEmails(email);

        // SENDS THE RESPONSE BASED ON THE MODEL RESULT
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.error("Erro ao processar o e-mail:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao processar o e-mail."
        });
    }
};

export { createEmailsController };