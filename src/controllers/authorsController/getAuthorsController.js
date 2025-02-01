import { getAllAuthor, getAuthorByUid } from '../../models/authorsModels/getAuthorsModel.js';

// FUNCTION TO GET ALL AUTHORS
const getAllAuthorsController = async (req, res) => {
    try {
        // GET MODEL AUTHOR LIST
        const authors = await getAllAuthor();

        // RETURN THE LIST OF AUTHORS IN JSON
        res.status(200).json({
            success: true,
            data: authors
        });
    } catch (error) {
        console.error("Erro ao obter autores:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter autores"
        });
    }
};

// FUNCTION TO GET AN AUTHOR BY UID
const getAuthorByUidController = async (req, res) => {
    try {
        const { uid } = req.params;

        // GET MODEL AUTHOR BY UID
        const author = await getAuthorByUid(uid);

        // RETURN THE AUTHOR DATA IN JSON
        res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        console.error(`Erro ao obter o autor com UID ${req.params.uid}:`, error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter o autor"
        });
    }
};

const searchAuthorsController = async (req, res) => {
    try {
        const { query } = req.params;
        const authors = await getAllAuthor();
        
        const filteredAuthors = authors.filter(author => 
            author.nameAuthor.toLowerCase().includes(query.toLowerCase())
        );

        res.status(200).json({
            success: true,
            data: filteredAuthors
        });
    } catch (error) {
        console.error("Erro ao buscar autores:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar autores"
        });
    }
};


export { getAllAuthorsController, getAuthorByUidController, searchAuthorsController };
