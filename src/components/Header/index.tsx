import React from 'react';

import { Container } from './styles';

const Header: React.FC = () => (
  <Container>
    <div>
      <a href="http://obahia.dea.ufv.br">
        <img
          src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
          alt="Obahia"
        />
      </a>
      <h1>Análise de Séries Temporais</h1>
    </div>
  </Container>
);

export default Header;
