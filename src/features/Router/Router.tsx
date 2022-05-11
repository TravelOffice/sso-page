import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import Initial from '../Initial/Initial';
import ZaloCallback from '../ZaloCallback/ZaloCallback';
import SignOut from '../SignOut/SignOut';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/zalo/callback" element={<ZaloCallback />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
