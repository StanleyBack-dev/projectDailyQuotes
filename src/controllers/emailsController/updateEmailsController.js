import { updateEmails } from '../../models/emailsModels/updateEmailsModel.js';

const updateEmailsController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "O campo de e-mail é obrigatório."
            });
        }

        // CALL THE TEMPLATE TO DEACTIVATE THE EMAIL
        const result = await updateEmails(email);

        // SEND THE RESPONSE BASED ON THE RESULT OF THE MODEL
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error("Error deactivating email:", error);
        res.status(500).json({
            success: false,
            message: "Error deactivating email."
        });
    }
};

export { updateEmailsController };