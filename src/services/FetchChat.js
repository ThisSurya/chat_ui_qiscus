import { useState, useEffect } from 'react';
// import mockData from '../assets/mockdata.json';
export function useChatData() {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);
        // Fetch dari file JSON local
        const response = await fetch('/mockdata.json');
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }
        
        const data = await response.json();
        setChatData(data.results[0]); // Ambil data pertama
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching chat data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  return { chatData, loading, error };
}