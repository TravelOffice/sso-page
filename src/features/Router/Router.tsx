import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import Initial from '../Initial/Initial';
import ZaloCallback from '../ZaloCallback/ZaloCallback';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import SignOut from '../SignOut/SignOut';
import ErrorPage from '../ErrorPage/ErrorPage';
import SetNewPassword from '../SetNewPassword/SetNewPassword';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/zalo/callback" element={<ZaloCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error-page" />} />
      </Routes>
    </BrowserRouter>
  );
}
