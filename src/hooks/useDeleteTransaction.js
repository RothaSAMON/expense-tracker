import { useState } from 'react';
import { db } from '../config/firebase-config'; // Update this to your firebase config
import { doc, deleteDoc } from 'firebase/firestore';

export const useDeleteTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTransaction = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const transactionDoc = doc(db, 'transactions', id);
      await deleteDoc(transactionDoc);
      // Optionally, trigger a re-fetch of transactions here or update state directly
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTransaction, loading, error };
};
