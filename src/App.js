import React from 'react';
import { ToastContainer } from 'react-toastify'

//If application is hosted on a static file server, use <HashRouter> instead of a <BrowserRouter>
import { HashRouter } from 'react-router-dom'; 

import GlobalStyle from '~/styles/global';

import Header from '~/components/Header';
import Routes from '~/routes';

function App() {
  return (
    <HashRouter basename="/">
    <Header />
    <Routes />
    <GlobalStyle />
    <ToastContainer className="toast-class" />
    </HashRouter>
  );
}

export default App;
