import { db } from './firebase.js';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

const getGoogleDriveFileId = (url) => {
  if (typeof url !== 'string' || !url.includes('drive.google.com')) return null;

  const filePathMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (filePathMatch?.[1]) return filePathMatch[1];

  const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openIdMatch?.[1]) return openIdMatch[1];

  return null;
};

const normalizeImageUrl = (url) => {
  const fileId = getGoogleDriveFileId(url);
  if (!fileId) return url;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
};

const normalizeDocument = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeDocument);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => {
        if (typeof entryValue === 'string' && key.toLowerCase().includes('image')) {
          return [key, normalizeImageUrl(entryValue)];
        }
        return [key, normalizeDocument(entryValue)];
      })
    );
  }

  return value;
};

export const firestoreService = {
  getAll: async (collectionName) => {
    try {
      const q = query(collection(db, collectionName), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...normalizeDocument(doc.data())
      }));
    } catch (error) {
      console.error(`Error getting ${collectionName}:`, error);
      throw error;
    }
  },

  getById: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...normalizeDocument(docSnap.data()) };
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${collectionName} document:`, error);
      throw error;
    }
  },

  add: async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
      throw error;
    }
  },

  update: async (collectionName, id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      return { id, ...data };
    } catch (error) {
      console.error(`Error updating ${collectionName}:`, error);
      throw error;
    }
  },

  delete: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error(`Error deleting from ${collectionName}:`, error);
      throw error;
    }
  },

  getStaticDoc: async (collectionName, docId) => {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...normalizeDocument(docSnap.data()) };
      }
      return null;
    } catch (error) {
      console.error(`Error getting static doc:`, error);
      throw error;
    }
  }
};