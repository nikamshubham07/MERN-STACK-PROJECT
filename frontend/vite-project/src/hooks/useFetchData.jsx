import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before new request
      try {
        const res = await fetch(url,{
            headers:{Authorization: `Bearer ${token}` },
          });

        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.message || 'Failed to fetch data');
        }

        setData(result.data)
        setLoading(false)
        // const result = await res.json();
        // setData(result.data || []); // Assuming 'result.data' is the desired array
      } catch (err) {
        // setError(err.message || 'Something went wrong');
        setLoading(false)
        setError(err.message)
      // } finally {
      //   setLoading(false); // Ensure loading is set to false in both success and error cases
      // }
    };
  }
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
