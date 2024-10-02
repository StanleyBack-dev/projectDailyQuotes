import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// FUNCTION TO REGISTER EMAILS
const createEmails = async (email) => {
    try {
        const subscribersCollection = collection(dbFirebase, 'subscribers');

        // QUERY TO CHECK IF THE EMAIL IS ALREADY REGISTERED
        const q = query(subscribersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0]; 
            const existingData = existingDoc.data();

            if (existingData.status === true) {
                // IF THE EMAIL IS ALREADY REGISTERED AND ACTIVE, IT DOES NOTHING
                return { success: false, message: "⚠️ O e-mail fornecido já está cadastrado e ativo em nossa base de dados." };
            } else {
                // IF THE EMAIL EXISTS BUT IS INACTIVE, REACTIVATE THE STATUS
                const docRef = doc(dbFirebase, 'subscribers', existingDoc.id);
                await updateDoc(docRef, {
                    status: true,
                    dateSubscribers: Timestamp.now(),
                });
                return { success: true, message: "🚀 E-mail reativado com sucesso! Estamos felizes em tê-lo de volta na nossa comunidade." };
            }
        } else {
            // IF THE EMAIL DOES NOT EXIST, REGISTER A NEW EMAIL
            await addDoc(subscribersCollection, {
                email,
                status: true,
                dateSubscribers: Timestamp.now(),
            });
            return { success: true, message: "🎉 Bem-vindo à nossa comunidade! Seu e-mail foi cadastrado com sucesso. Estamos felizes em ter você conosco!" };
        }
    } catch (error) {
        console.error("Error adding or updating email:", error);
        throw error;
    }
};

export { createEmails };