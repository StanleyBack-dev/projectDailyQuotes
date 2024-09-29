import axios from "axios";
import { getBiography } from "./apiWikipedia.js";
import { createQuotes } from "../models/quotesModels/createQuotesModel.js";

// FUNCTION TO GET THE QUOTE OF THE DAY THROUGH THE API
const getPhrases = async () => {
    try {
        // MAKING A REQUEST FOR THE NEW ZENQUOTES API
        const response = await axios.get('https://zenquotes.io/api/random');
        const { q: content, a: author } = response.data[0]; // 'q' is the quote, 'a' is the author

        // TRANSLATE THE CONTENT INTO PORTUGUESE USING THE GOOGLE TRANSLATE API
        const translationResponseContent = await axios.post(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(content)}`);
        const translatedContent = translationResponseContent.data[0][0][0];

        // Since ZenQuotes doesn't provide tags, we'll use an empty string for tags
        const tagsString = '';

        // GETS AUTHOR BIOGRAPHY AND RETRIEVES THE AUTHOR'S UID
        const uid_author = await getBiography(author);

        // CREATE THE QUOTE IN THE FIREBASE COLLECTION
        await createQuotes({
            content: translatedContent,
            author: uid_author,
            dateRegistered: new Date(),
            tags: tagsString // Save tags as a single string (empty in this case)
        });

        const message = `"${translatedContent}"\n\n- ${author}`;

        return message;

    } catch (error) {
        console.error(`Error getting or sending quote: ${error.message}`);
        return null;
    }
};

export { getPhrases };