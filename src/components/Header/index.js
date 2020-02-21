import React from 'react';

import { HeaderContainer } from './styles';

import logo from '~/assets/images/logo.png';

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <a href="http://obahia.dea.ufv.br"><img src={logo} alt="Obahia" /> </a>
        <h1>Sistema de Inteligência Territorial Estratégica (Alpha - Version)</h1>
      </div>
    </HeaderContainer>
  );
}

export default Header;
