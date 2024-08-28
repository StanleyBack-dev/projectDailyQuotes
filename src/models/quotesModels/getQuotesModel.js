import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore';

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

// Função para buscar a última citação
const getLastQuote = async () => {
    try {
        // Cria uma query para ordenar as citações pela data de registro e pegar a última
        const quotesCollection = collection(dbFirebase, 'quotes');
        const lastQuoteQuery = query(quotesCollection, orderBy('dateRegistered', 'desc'), limit(1));
        const querySnapshot = await getDocs(lastQuoteQuery);

        if (querySnapshot.empty) {
            console.log("Nenhuma citação encontrada.");
            return null;
        }

        const lastQuote = querySnapshot.docs[0].data();

        // Verifica se o campo dateRegistered existe antes de usar toDate()
        if (lastQuote.dateRegistered) {
            const lastQuoteDate = lastQuote.dateRegistered.toDate().toISOString().split('T')[0]; // Formata a data YYYY-MM-DD

            // Ajusta o horário de Brasília (UTC-3)
            const currentDate = new Date();
            const currentBrasiliaTime = new Date(currentDate.getTime() - 3 * 60 * 60 * 1000);
            const currentDateFormatted = currentBrasiliaTime.toISOString().split('T')[0];
            const currentHour = currentBrasiliaTime.getUTCHours(); // Pega a hora no formato UTC

            // Verifica se a data da última citação é hoje e se está no intervalo de 8h-9h
            if (lastQuoteDate === currentDateFormatted) {
                const lastQuoteHour = lastQuote.dateRegistered.toDate().getUTCHours();
                if (lastQuoteHour >= 8 && lastQuoteHour < 9) {
                    console.log("Já existe uma citação registrada entre 8h e 9h para hoje.");
                    return null;
                }
            }

            // Verifica se o horário atual está dentro do intervalo permitido (8h-9h)
            if (currentHour >= 8 && currentHour < 9) {
                return lastQuote;
            } else {
                console.log("Fora do horário permitido para envio (8h-9h).");
                return null;
            }
        } else {
            console.log("O campo 'dateRegistered' não está presente no documento.");
            return null;
        }

    } catch (error) {
        console.error("Erro ao buscar a última citação registrada: ", error);
        throw error;
    }
};

export { getAllQuotes, getAuthorNameByUid, getLastQuote };
