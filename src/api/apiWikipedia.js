import axios from "axios";
import { createAuthor } from "../models/authorsModels/createAuthorsModel.js";

const getBiography = async (author) => {
    try {
        // Substitui espaços por underscores no nome do autor
        const formattedAuthor = author.replace(/ /g, '_');
        const response = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${formattedAuthor}`);

        const biographyData = response.data;

        // Chama a função para salvar ou atualizar os dados do autor no Firebase
        const result = await createAuthor({
            nameAuthor: author,
            dateRegistered: new Date(),
            descriptionBiography: biographyData.description || "",
            imageOriginal: biographyData.originalimage ? biographyData.originalimage.source : "",
            imageThumbnail: biographyData.thumbnail ? biographyData.thumbnail.source : "",
            informationLink: biographyData.content_urls ? biographyData.content_urls.desktop.page : "",
            summaryBiographical: biographyData.extract || ""
        });

        return result;
    } catch (error) {
        console.error("Erro ao consultar Biografia e salvar dados no Firebase.");
        throw error;
    }
}

export { getBiography };