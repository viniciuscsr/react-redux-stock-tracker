import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (initUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(false);
        const response = await axios(initUrl);
        if (!ignore) setData(response.data);
      } catch (err) {
        setError('Something went wrong');
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [initUrl]);

  return { data, loading, error };
};

export default useRequest;
