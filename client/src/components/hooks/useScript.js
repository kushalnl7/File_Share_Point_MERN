import { useEffect } from 'react';

const useScript = (url, integrity, crossOrigin) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;