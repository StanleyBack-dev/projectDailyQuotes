import axios from "axios";
import { getBiography } from "./apiWikipedia.js";
import { createQuotes } from "../models/quotesModels/createQuotesModel.js";

// FUNCTION TO GET THE QUOTE OF THE DAY THROUGH THE API
const getPhrases = async () => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        const { q: content, a: author } = response.data[0];

        const translationResponseContent = await axios.post(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(content)}`);
        const translatedContent = translationResponseContent.data[0][0][0];

        const tagsString = '';
        const uid_author = await getBiography(author);

        await createQuotes({
            content: translatedContent,
            author: uid_author,
            dateRegistered: new Date(),
            tags: tagsString
        });

        return { quote: translatedContent, author };

    } catch (error) {
        console.error(`Error getting or sending quote: ${error.message}`);
        return null; // Retornar null em caso de erro
    }
};

export { getPhrases };