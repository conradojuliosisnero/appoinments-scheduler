import { useState } from 'react';

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const defaultHeaders = {
        'Content-Type': 'application/json'
      };

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      })
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      setData(data);
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData
  };
};

// example useFetch:
// const { data, loading, error, fetchData } = useFetch();
// await fetchData('/api/endpoint', { method: 'POST', body: JSON.stringify(data) });