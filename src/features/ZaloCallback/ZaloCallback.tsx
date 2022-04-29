import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ZaloCallback() {
  const location = useLocation();
  const [messageSent, setMessageSent] = useState(false);
  useEffect(() => {
    if (!messageSent) {
      window.opener.postMessage({
        type: 'zaloCallback',
        data: location.search,
      }, '*');
      setMessageSent(true);
      window.close();
    }
  }, [location]);
  return (
    <div />
  );
}
