import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("token: ",token);  // For debugging purposes, make sure token is correct
      setError(null); // Reset error before new request
      // console.log(url)
      try {
        // Fetch the data from the API
        // setLoading(true);
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is valid
            'Content-Type': 'application/json'
          }
        });

        console.log("res: ",res);
    
        // Check if the response is OK (status code 200-299)
        if (!res.ok) {
          const errorResult = await res.json(); // Parse error message
          throw new Error(errorResult.message || 'Failed to fetch data');
  
        }
    
        // Parse the JSON response
        const result = await res.json();
        setData(result.data); // Assuming 'result.data' is the array/object you need
        setLoading(false);
      } catch (err) {
        // If there's any error, set the error message
        // console.log(err)
        setError(err.message || 'Something went wrong');
        setLoading(false);
      } finally {
        // Always stop loading, regardless of success or failure
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
