import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ZaloCallback() {
  const location = useLocation();
  useEffect(() => {
    window.opener.postMessage(location.search, '*');
  }, [location]);
  return (
    <div />
  );
}
