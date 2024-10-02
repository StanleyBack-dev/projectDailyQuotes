import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// FUNCTION TO SEARCH ALL CITATIONS
const getAllQuotes = async () => {
    try {

        const quotesCollection = collection(dbFirebase, 'quotes');
        const quotesSnapshot = await getDocs(quotesCollection);
        const quotesList = quotesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // SEARCH FOR AUTHORS
        const authorUids = [...new Set(quotesList.map(quote => quote.author))];
        const authorsPromises = authorUids.map(uid => getAuthorNameByUid(uid));
        const authors = await Promise.all(authorsPromises);

        // MAPS THE NAMES OF THE AUTHORS
        const authorsMap = authors.reduce((map, author) => {
            map[author.id] = author.nameAuthor;
            return map;
        }, {});

        // REPLACE UIDS WITH AUTHOR NAME AND REMOVE DATE
        return quotesList.map(quote => ({
            id: quote.id,
            content: quote.content,
            tags: quote.tags,
            author: authorsMap[quote.author] || quote.author,
        }));

    } catch (error) {
        console.error("Error fetching all citations: ", error);
        throw error;
    }
};

// FUNCTION TO SEARCH FOR AN AUTHOR BY UID
const getAuthorNameByUid = async (uid) => {
    try {
        const authorDocRef = doc(dbFirebase, 'authors', uid);
        const authorDoc = await getDoc(authorDocRef);

        if (authorDoc.exists()) {
            return {
                id: authorDoc.id,
                nameAuthor: authorDoc.data().nameAuthor
            };
        } else {
            throw new Error("Author not found");
        }
    } catch (error) {
        console.error(`Error fetching author with UID ${uid}: `, error);
        throw error;
    }
};

export { getAllQuotes, getAuthorNameByUid };