import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      setError(null); // Reset error before new request
  
      try {
       
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is valid
            'Content-Type': 'application/json'
          }
        });

    
        if (!res.ok) {
          const errorResult = await res.json(); // Parse error message
          throw new Error(errorResult.message || 'Failed to fetch data');
  
        }
    
        // Parse the JSON response
        const result = await res.json();
        setData(result.data); 
        setLoading(false);
      } catch (err) {
        
        setError(err.message || 'Something went wrong');
        setLoading(false);
      } finally {
        
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
