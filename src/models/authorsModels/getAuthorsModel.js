import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Função para buscar todos os autores
const getAllAuthor = async () => {
    try {
        const authorsCollection = collection(dbFirebase, 'authors');
        const authorsSnapshot = await getDocs(authorsCollection);
        const authorsList = authorsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return authorsList;
    } catch (error) {
        console.error("Erro ao buscar todos os autores: ", error);
        throw error;
    }
};

// Função para buscar um autor pelo UID
const getAuthorByUid = async (uid) => {
    try {
        const authorDocRef = doc(dbFirebase, 'authors', uid);
        const authorDoc = await getDoc(authorDocRef);

        if (authorDoc.exists()) {
            return {
                id: authorDoc.id,
                ...authorDoc.data()
            };
        } else {
            throw new Error("Autor não encontrado");
        }
    } catch (error) {
        console.error(`Erro ao buscar o autor com UID ${uid}: `, error);
        throw error;
    }
};

// Função para buscar o último autor inserido
const getLastAuthor = async () => {
    try {
        const authorsCollection = collection(dbFirebase, 'authors');
        const q = query(authorsCollection, orderBy('dateRegistered', 'desc'), limit(1));
        const authorsSnapshot = await getDocs(q);

        if (!authorsSnapshot.empty) {
            const lastAuthorDoc = authorsSnapshot.docs[0];
            return {
                id: lastAuthorDoc.id,
                ...lastAuthorDoc.data()
            };
        } else {
            throw new Error("Nenhum autor encontrado");
        }
    } catch (error) {
        console.error("Erro ao buscar o último autor inserido: ", error);
        throw error;
    }
};

export { getAllAuthor, getAuthorByUid, getLastAuthor };
