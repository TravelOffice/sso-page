import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FallbackSpinner from '@components/FallbackSpinner/FallbackSpinner';
import authProvider from '@providers/AuthProvider';

export default function Initial() {
  const navigate = useNavigate();
  useEffect(() => {
    authProvider.getSession().then((session) => {
      const message = { type: 'cognito-signin', session };
      window.parent.postMessage(message, '*');
    }).catch(() => {
      navigate('/sign-in');
    });
  }, []);
  return (
    <FallbackSpinner />
  );
}
