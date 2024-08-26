import { dbFirebase } from "../../../firebaseConfig.js";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Função para criar ou atualizar dados de autores
const createAuthor = async (authorData) => {
    try {
        const authorsCollection = collection(dbFirebase, 'authors');

        // Consulta para verificar se o autor já está registrado
        const q = query(authorsCollection, where('nameAuthor', '==', authorData.nameAuthor));
        const querySnapshot = await getDocs(q);

        // Adiciona o timestamp de registro atual, caso ainda não esteja presente
        authorData.dateRegistered = authorData.dateRegistered || Timestamp.now();

        let uid;

        if (!querySnapshot.empty) {
            // Se o autor já existir, atualizar os dados
            const existingDoc = querySnapshot.docs[0]; 
            const docRef = doc(dbFirebase, 'authors', existingDoc.id);

            // Atualiza o documento com o `uid` existente
            authorData.uid = existingDoc.id;
            uid = existingDoc.id;

            await updateDoc(docRef, authorData);
        } else {
            // Se o autor não existir, criar um novo registro
            const newDocRef = await addDoc(authorsCollection, authorData);

            // Atualiza o documento recém-criado com o `uid`
            uid = newDocRef.id;
            await updateDoc(newDocRef, { uid: uid });
        }

        // Retorna apenas o UID
        return uid;
    } catch (error) {
        console.error("Erro ao adicionar ou atualizar autor:", error);
        throw error;
    }
};

export { createAuthor };