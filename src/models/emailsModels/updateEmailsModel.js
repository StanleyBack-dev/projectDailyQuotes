import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const updateEmails = async (email) => {
    try {
        const subscribersCollection = collection(dbFirebase, 'subscribers');

        // Query para verificar se o e-mail já está cadastrado
        const q = query(subscribersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];  // Considerando que e-mails são únicos
            const docRef = doc(dbFirebase, 'subscribers', existingDoc.id);

            // Atualiza o status do e-mail para false (inativo)
            await updateDoc(docRef, {
                status: false
            });

            return { success: true, message: "E-mail inativado com sucesso." };
        } else {
            return { success: false, message: "E-mail não encontrado." };
        }
    } catch (error) {
        console.error("Erro ao inativar o e-mail:", error);
        throw error;
    }
};

export { updateEmails };
