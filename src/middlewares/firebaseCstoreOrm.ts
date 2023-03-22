import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
const db = require("../configs/firebase").db;

export class FirebaseCstoreOrm {
  async addDocToCollection<T>(
    collectionName: string,
    values: T
  ): Promise<boolean> {
    try {
      const docRef = await addDoc(collection(db, collectionName), values);
      await updateDoc(doc(db, collectionName, docRef.id), { id: docRef.id });

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateDocOnCollection<T>(
    collectionName: string,
    values: any,
    docId: string
  ): Promise<boolean> {
    try {
      console.log(values);
      await updateDoc(doc(db, collectionName, docId), values);

      return true;
    } catch (e) {
      return false;
    }
  }
}
