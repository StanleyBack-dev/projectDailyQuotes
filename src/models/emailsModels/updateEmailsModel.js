import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const updateEmails = async (email) => {
    try {
        const subscribersCollection = collection(dbFirebase, 'subscribers');

        // QUERY TO CHECK IF THE EMAIL IS ALREADY REGISTERED
        const q = query(subscribersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const docRef = doc(dbFirebase, 'subscribers', existingDoc.id);

            // UPDATE EMAIL STATUS TO FALSE (INACTIVE)
            await updateDoc(docRef, {
                status: false
            });

            return { success: true, message: "E-mail inativado com sucesso." };
        } else {
            return { success: false, message: "E-mail não encontrado." };
        }
    } catch (error) {
        console.error("Error deactivating email:", error);
        throw error;
    }
};

export { updateEmails };