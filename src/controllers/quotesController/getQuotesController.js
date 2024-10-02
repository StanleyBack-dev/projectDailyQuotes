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
        console.error("Error getting citations:", error);
        res.status(500).json({
            success: false,
            message: "Error getting quotes"
        });
    }
};


// FUNCTION TO GET A CITATION BY ID
const getQuoteByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // GET CITATION BY TEMPLATE ID
        const quote = await getAuthorNameByUid(id);

        // RETURN CITATION DATA TO JSON
        res.status(200).json({
            success: true,
            data: quote
        });
    } catch (error) {
        console.error(`Error getting citation with ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error retrieving citation"
        });
    }
};

export { getAllQuotesController, getQuoteByIdController };