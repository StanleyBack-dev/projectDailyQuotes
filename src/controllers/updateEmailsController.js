import { updateEmails } from '../models/updateEmailsModel.js';

const updateEmailsController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "O campo de e-mail é obrigatório."
            });
        }

        // Chama o modelo para inativar o e-mail
        const result = await updateEmails(email);

        // Envia a resposta com base no resultado do modelo
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error("Erro ao inativar o e-mail:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao inativar o e-mail."
        });
    }
};

export { updateEmailsController };
