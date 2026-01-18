import { useState, useEffect } from 'react';

type NetworkInformation = {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
};

const useNetwork = (): NetworkInformation => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInformation>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetworkInfo(prev => ({ ...prev, online: true }));
    };

    const handleOffline = () => {
      setNetworkInfo(prev => ({ ...prev, online: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return networkInfo;
};

export default useNetwork;
