import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import RefreshToken from '@features/RefreshToken/RefreshToken';
import MailCallback from '@features/MailCallback/MailCallback';
import SignIn from '../SignIn/SignIn';
import Initial from '../Initial/Initial';
import ZaloCallback from '../ZaloCallback/ZaloCallback';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import SignOut from '../SignOut/SignOut';
import ErrorPage from '../ErrorPage/ErrorPage';
import ChangePassword from '../ChangePassword/ChangePassword';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/refresh" element={<RefreshToken />} />
        <Route path="/zalo/callback" element={<ZaloCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="/mail/callback" element={<MailCallback />} />
        <Route path="*" element={<Navigate to="/error-page" />} />
      </Routes>
    </BrowserRouter>
  );
}
