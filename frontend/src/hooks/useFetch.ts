import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const res = await response.json();
      if (res) {
        setData(res);
      } else {
        setData([]);
        setLoading(false);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
