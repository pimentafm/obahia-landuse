import React from 'react';

// import { Container } from './styles';

import Map from '../../components/Map';
import Card from '../../components/Card';

let myyear = 2018;

export default function Region() {
  return (
    <>
    <Card defaultCategory="Região" defaultYear={myyear}/>
    <Map year={myyear}/>
    </>
  );
}
