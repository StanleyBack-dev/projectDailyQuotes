import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, addDoc } from 'firebase/firestore';

const createQuotes = async (quoteData) => {
    try {
        const quotesCollection = collection(dbFirebase, 'quotes');
        await addDoc(quotesCollection, quoteData);
        return { success: true, message: "Frase cadastrada com sucesso." };
    } catch (error) {
        console.error("Erro ao adicionar frase:", error);
        throw error;
    }
};

export { createQuotes };