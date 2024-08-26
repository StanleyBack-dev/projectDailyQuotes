import { getAllQuotes, getAuthorNameByUid } from '../../models/quotesModels/getQuotesModel.js';

// FUNCTION TO GET ALL QUOTES
const getAllQuotesController = async (req, res) => {
    try {
        // GET MODEL QUOTE LIST
        const quotes = await getAllQuotes();

        // RETURN THE LIST OF QUOTES IN JSON
        res.status(200).json({
            success: true,
            data: quotes
        });
    } catch (error) {
        console.error("Erro ao obter citações:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter citações"
        });
    }
};


// Função para obter uma citação por ID
const getQuoteByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // Obter a citação pelo ID do modelo
        const quote = await getAuthorNameByUid(id);

        // Retornar os dados da citação em JSON
        res.status(200).json({
            success: true,
            data: quote
        });
    } catch (error) {
        console.error(`Erro ao obter a citação com ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter a citação"
        });
    }
};

export { getAllQuotesController, getQuoteByIdController };
