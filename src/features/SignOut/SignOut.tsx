import React, { useEffect } from 'react';
import authProvider from '@providers/AuthProvider';

export default function SignOut() {
  useEffect(() => {
    authProvider.signOut();
    const message = { type: 'cognito-signout' };
    window.parent.postMessage(message, '*');
  }, []);
  return (
    <div />
  );
}
