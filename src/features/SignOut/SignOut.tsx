import React, { useEffect } from 'react';
import authProvider from '@providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    authProvider.signOut();
    navigate('/sign-in');
  }, []);
  return (
    <div />
  );
}
