import React from 'react';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter basename="/webmap">
    <Header />
    <Routes />
    <GlobalStyle />
    <ToastContainer className="toast-class" />
    </BrowserRouter>
  );
}

export default App;
