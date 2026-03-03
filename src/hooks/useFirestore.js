import { useState, useEffect, useCallback } from 'react';
import { firestoreService } from '../services/firestoreService.js';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
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
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useStaticDoc = (collectionName, docId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoc = useCallback(async () => {
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
  }, [collectionName, docId]);

  useEffect(() => {
    fetchDoc();
  }, [fetchDoc]);

  return { data, loading, error };
};