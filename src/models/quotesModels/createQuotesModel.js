import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, addDoc } from 'firebase/firestore';

const createQuotes = async (quoteData) => {
    try {
        const quotesCollection = collection(dbFirebase, 'quotes');
        await addDoc(quotesCollection, quoteData);
        return { success: true, message: "Phrase registered successfully." };
    } catch (error) {
        console.error("Error adding sentence:", error);
        throw error;
    }
};

export { createQuotes };