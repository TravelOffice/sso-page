import React, { useCallback, useEffect } from 'react';
import authProvider from '@providers/AuthProvider';

export default function RefreshToken() {
  const postNewSessionMessage = useCallback(() => {
    authProvider.refreshToken().then((newSession) => {
      const message = { type: 'cognito-refresh', data: newSession };
      window.parent.postMessage(message, '*');
    });
  }, []);
  useEffect(() => {
    authProvider.getSession().then((session) => {
      const issuedAt = session.getIdToken().getIssuedAt();
      const expiration = session.getIdToken().getExpiration();
      const expirationDate = new Date(expiration * 1000);
      // Refresh session at 5 minutes before expiration
      const nextTimeToRefresh = expirationDate.getTime() - Date.now() - 5 * 60 * 1000;
      const intervalToRefresh = (expiration - issuedAt) * 1000 - 5 * 60 * 1000;
      setTimeout(() => {
        postNewSessionMessage();
        setInterval(postNewSessionMessage, intervalToRefresh);
      }, nextTimeToRefresh);
    });
  }, []);
  return (
    <></>
  );
}
