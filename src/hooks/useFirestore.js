import { useState, useEffect } from 'react';
import { firestoreService } from '../services/firestoreService.js';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await firestoreService.getAll(collectionName);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
};

export const useStaticDoc = (collectionName, docId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoc();
  }, [collectionName, docId]);

  const fetchDoc = async () => {
    try {
      setLoading(true);
      const result = await firestoreService.getStaticDoc(collectionName, docId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};