import { useState, useEffect } from 'react';

/**
 * Hook que permite obtener recursos
 */
const useGetData = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
        
        
        try {
            let res = await fetch(url, { signal: abortController.signal });

            if (!res.ok) {
                throw Error('No se pudo obtener el recurso');
            }

            setResponse(await res.json());
            setError(null);

        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('La solicitud fue cancelada')
            } else {
                setError(err.message);
            }
        }
    })();

    return () => abortController.abort();
  }, [url]);

  return { response, error };
}
 
export default useGetData;