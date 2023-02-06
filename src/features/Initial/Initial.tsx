import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FallbackSpinner from '@components/FallbackSpinner/FallbackSpinner';
import authProvider from '@providers/AuthProvider';

export default function Initial() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUri: string | null = searchParams.get('redirect_uri');
  useEffect(() => {
    authProvider.getSession().then((session) => {
      if (redirectUri) {
        const jwtToken = session.getIdToken().getJwtToken();
        window.location.replace(`${redirectUri}?id_token=${jwtToken}`);
      }
    }).catch(() => {
      navigate('/sign-in', {
        state: {
          redirectUri,
        },
      });
    });
  }, []);
  return (
    <FallbackSpinner />
  );
}
