import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, getCountFromServer } from 'firebase/firestore';

// FUNCTION TO SEARCH E-MAILS REGISTERED IN FIRESTORE
const getEmails = async () => {
    try {
        const subscribersCollection = collection(dbFirebase, 'subscribers');
        const q = query(subscribersCollection, where('status', '==', true));
        const querySnapshot = await getDocs(q);

        const emails = querySnapshot.docs.map(doc => doc.data().email);

        return emails;

    } catch (error) {
        console.error("Error when searching for emails:", error);
        throw error;
    }
}

// FUNCTION TO COUNT THE NUMBERS OF REGISTERED EMAILS (READERS)
const getCountEmails = async () => {
    try {
        const subscribersCollection = collection(dbFirebase, 'subscribers');
        const q = query(subscribersCollection, where('status', '==', true));
        const countSnapshot = await getCountFromServer(q);


        return countSnapshot.data().count;

    } catch (error) {
        console.error("Error counting emails:", error);
        throw error;
    }
};

export { getEmails, getCountEmails };