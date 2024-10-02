import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// FUNCTION TO CREATE OR UPDATE AUTHOR DATA
const createAuthor = async (authorData) => {
    try {
        const authorsCollection = collection(dbFirebase, 'authors');

        // QUERY TO CHECK IF THE AUTHOR IS ALREADY REGISTERED
        const q = query(authorsCollection, where('nameAuthor', '==', authorData.nameAuthor));
        const querySnapshot = await getDocs(q);

        // ADDS THE CURRENT LOG TIMESTAMP IF NOT ALREADY PRESENT
        authorData.dateRegistered = authorData.dateRegistered || Timestamp.now();

        let uid;

        if (!querySnapshot.empty) {
            // IF THE AUTHOR ALREADY EXISTS, UPDATE THE DATA
            const existingDoc = querySnapshot.docs[0]; 
            const docRef = doc(dbFirebase, 'authors', existingDoc.id);

            // UPDATES THE DOCUMENT WITH THE EXISTING `UID`
            authorData.uid = existingDoc.id;
            uid = existingDoc.id;

            await updateDoc(docRef, authorData);
        } else {
            // IF THE AUTHOR DOES NOT EXIST, CREATE A NEW RECORD
            const newDocRef = await addDoc(authorsCollection, authorData);

            // UPDATES THE NEWLY CREATED DOCUMENT WITH THE `UID`
            uid = newDocRef.id;
            await updateDoc(newDocRef, { uid: uid });
        }

        // RETURNS ONLY THE UID
        return uid;
    } catch (error) {
        console.error("Error adding or updating author:", error);
        throw error;
    }
};

export { createAuthor };