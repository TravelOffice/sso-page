import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface CallbackProps {
  type: string,
  metadata?: Record<string, any>
}

export default function Callback(props: CallbackProps) {
  const { type, metadata = {} } = props;
  const location = useLocation();
  const [messageSent, setMessageSent] = useState(false);
  useEffect(() => {
    if (!messageSent) {
      window.opener.postMessage({
        type,
        data: location.search,
        metadata,
      }, '*');
      setMessageSent(true);
      window.close();
    }
  }, [location]);
  return (
    <div />
  );
}

Callback.defaultProps = {
  metadata: {},
};
