import React, { useEffect } from 'react';
import authProvider from '@providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getRedirectUri } from '../../utils/getRedirectUriUtils';

export default function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectUri = getRedirectUri(window.location.search);
    authProvider.signOut();
    navigate('/sign-in', {
      state: {
        redirectUri,
      },
    });
  }, []);
  return (
    <div />
  );
}
