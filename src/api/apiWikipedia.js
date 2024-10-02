import axios from "axios";
import { createAuthor } from "../models/authorsModels/createAuthorsModel.js";

const getBiography = async (author) => {
    try {
        // REPLACE SPACES WITH UNDERSCORES IN THE AUTHOR NAME
        const formattedAuthor = author.replace(/ /g, '_');
        const response = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${formattedAuthor}`);

        const biographyData = response.data;

        // CALLS THE FUNCTION TO SAVE OR UPDATE AUTHOR DATA IN FIREBASE
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
        console.error("Error querying Biography and saving data to Firebase.");
        throw error;
    }
}

export { getBiography };