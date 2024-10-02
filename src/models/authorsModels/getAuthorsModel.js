import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// FUNCTION TO SEARCH FOR ALL AUTHORS
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
        console.error("Error fetching all authors: ", error);
        throw error;
    }
};

// FUNCTION TO SEARCH FOR AN AUTHOR BY UID
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
            throw new Error("Author not found");
        }
    } catch (error) {
        console.error(`Error fetching author with UID ${uid}: `, error);
        throw error;
    }
};

// FUNCTION TO SEARCH FOR THE LAST INSERTED AUTHOR
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
            throw new Error("No author found");
        }
    } catch (error) {
        console.error("Error fetching last inserted author: ", error);
        throw error;
    }
};

export { getAllAuthor, getAuthorByUid, getLastAuthor };