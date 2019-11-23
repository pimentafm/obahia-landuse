import React from 'react';

import { HeaderContainer } from './styles';

import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <HeaderContainer>
      <a href="http://obahia.dea.ufv.br"><img src={logo} alt="Obahia" /> </a>
    </HeaderContainer>
  );
}
