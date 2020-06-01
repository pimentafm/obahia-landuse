import React from 'react';
import { HashRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes/index';

const App: React.FC = () => (
  <HashRouter>
    <Header />
    <Routes />
    <GlobalStyle />
  </HashRouter>
);

export default App;
