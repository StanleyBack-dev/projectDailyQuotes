import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';

// Função para buscar todas as citações
const getAllQuotes = async () => {
    try {
        // Coleta de citações
        const quotesCollection = collection(dbFirebase, 'quotes');
        const quotesSnapshot = await getDocs(quotesCollection);
        const quotesList = quotesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Busca os autores
        const authorUids = [...new Set(quotesList.map(quote => quote.author))];
        const authorsPromises = authorUids.map(uid => getAuthorNameByUid(uid));
        const authors = await Promise.all(authorsPromises);

        // Mapeia os nomes dos autores
        const authorsMap = authors.reduce((map, author) => {
            map[author.id] = author.nameAuthor;
            return map;
        }, {});

        // Substitui os UIDs pelo nome do autor e remove a data
        return quotesList.map(quote => ({
            id: quote.id,
            content: quote.content,
            tags: quote.tags,
            author: authorsMap[quote.author] || quote.author,
        }));

    } catch (error) {
        console.error("Erro ao buscar todas as citações: ", error);
        throw error;
    }
};

// Função para buscar um autor pelo UID
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
            throw new Error("Autor não encontrado");
        }
    } catch (error) {
        console.error(`Erro ao buscar o autor com UID ${uid}: `, error);
        throw error;
    }
};

export { getAllQuotes, getAuthorNameByUid };
