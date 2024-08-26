import axios from "axios";
import { getBiography } from "./apiWikipedia.js";
import { createQuotes } from "../models/quotesModels/createQuotesModel.js";
import { apiEmail } from "./apiEmail.js";

// FUNCTION TO GET THE QUOTE OF THE DAY THROUGH THE API
const getPhrases = async () => {
    try {
        // MAKING A REQUEST FOR THE FREE PHRASE GENERATION API
        const response = await axios.get('https://api.quotable.io/random');
        const { content, author, tags } = response.data;

        // TRANSLATE THE CONTENT INTO PORTUGUESE USING THE GOOGLE TRANSLATE API
        const translationResponseContent = await axios.post(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(content)}`);
        const translatedContent = translationResponseContent.data[0][0][0];

        // TRANSLATE EACH TAG INTO PORTUGUESE
        const translateTag = async (tag) => {
            try {
                const response = await axios.post(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(tag)}`);
                return response.data[0][0][0];
            } catch (error) {
                console.error(`Error translating tag "${tag}": ${error.message}`);
                return tag; // Return the original tag in case of an error
            }
        };

        // Translate all tags and join them into a single string
        const translatedTagsPromises = (tags || []).map(tag => translateTag(tag));
        const translatedTags = await Promise.all(translatedTagsPromises);
        const tagsString = translatedTags.join(', ');

        // GETS AUTHOR BIOGRAPHY AND RETRIEVES THE AUTHOR'S UID
        const uid_author = await getBiography(author);
        
        // CREATE THE QUOTE IN THE FIREBASE COLLECTION
        await createQuotes({
            content: translatedContent,
            author: uid_author,
            dateRegistered: new Date(),
            tags: tagsString // Save tags as a single string
        });

        const message = `"${translatedContent}"\n\n- ${author}`;

        return message;

    } catch (error) {
        console.error(`Error getting or sending quote: ${error.message}`);
        return null;
    }
}

export { getPhrases };
