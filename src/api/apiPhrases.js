import axios from "axios";
import { getBiography } from "./apiWikipedia.js";
//import { createQuotes } from "../models/quotesModels/createQuotesModel.js";

// FUNCTION TO GET THE QUOTE OF THE DAY THROUGH THE API
const getPhrases = async () => {
    try {
        // MAKING A REQUEST FOR THE FREE PHRASE GENERATION API
        const response = await axios.get('https://api.quotable.io/random');
        const { content, author, tags } = response.data;

        // TRANSLATE THE SENTENCE INTO PORTUGUESE USING THE GOOGLE TRANSLATE API
        const translationResponse = await axios.post(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(content)}`);
        const translatedContent = translationResponse.data[0][0][0];

        // GETS AUTHOR BIOGRAPHY AND RETRIEVES THE AUTHOR'S UID
        //const uid_author = await getBiography(author);
        /*
        // CREATE THE QUOTE IN THE FIREBASE COLLECTION
        await createQuotes({
            content: translatedContent,
            author: author,
            dateRegistered: new Date(),
            tags: tags || []
        });
        */

        const message = `"${translatedContent}"\n\n- ${author}`;

        return message;

    } catch (error) {
        console.error(`Error getting or sending quote: ${error.message}`);
        return null;
    }
}

export { getPhrases };
