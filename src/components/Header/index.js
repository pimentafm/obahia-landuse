import React from 'react';

import { Container } from './styles';

import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <Container>
      <a href="http://obahia.dea.ufv.br"><img src={logo} alt="Obahia" /> </a>
    </Container>
  );
}
