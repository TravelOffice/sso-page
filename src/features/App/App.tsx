import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Router from '../Router/Router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
