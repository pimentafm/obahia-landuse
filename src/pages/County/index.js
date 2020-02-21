import React from 'react';

import CountyMap from '../../components/CountyMap';

export default function Region() {
  return (
    <>
    <CountyMap 
      id="map" 
      defaultYear={2018}
      defaultCodeName={{"code": 2903201, "name": "BARREIRAS - 2903201"}}
      defaultCategory="Municípios"
      center={[-45.37787, -12.22042]}
      zoom={8}
      />
    </>
  );
}
