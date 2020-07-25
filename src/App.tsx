import React from 'react';
import { HashRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes/index';

const App: React.FC = () => (
  <HashRouter>
    <Routes />
    <GlobalStyle />
  </HashRouter>
);

export default App;
