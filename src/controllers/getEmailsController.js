import { getEmails, getCountEmails } from '../models/getEmailsModel.js';

// FUNCTION TO GET SUBSCRIBED EMAILS
const getEmailsController = async (req, res) => {
    try {
        const { status } = req.query;
        const statusBoolean = status === 'true';

        // GET MODEL EMAIL LIST
        const emails = await getEmails(statusBoolean);

        // RETURN THE LIST OF EMAIL IN JSON
        res.status(200).json({
            success: true,
            data: emails
        });
    } catch (error) {
        console.error("Erro ao obter e-mails:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter e-mails"
        });
    }
};

// FUNCTION TO GET THE COUNT OF ACTIVE E-MAILS
const getCountEmailsController = async (req, res) => {
    try {
        // GET THE COUNT OF ACTIVE EMAILS FROM THE TEMPLATE
        const count = await getCountEmails();

        // RETURN THE LIST OF EMAIL IN JSON
        res.status(200).json({
            success: true,
            activeReadersCount: count
        });
    } catch (error) {
        console.error("Erro ao obter a contagem de e-mails:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter a contagem de e-mails"
        });
    }
};

export { getEmailsController, getCountEmailsController };