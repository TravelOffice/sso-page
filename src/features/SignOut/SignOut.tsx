import React, { useEffect } from 'react';
import authProvider from '../../providers/AuthProvider';

export default function SignOut() {
  useEffect(() => {
    authProvider.signOut();
  }, []);
  return (
    <div />
  );
}
