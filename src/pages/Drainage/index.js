import React from 'react';

import DrainageMap from '~/components/DrainageMap';

export default function Region() {
  return (
    <>
    <DrainageMap 
      id="map" 
      defaultYear={2018}
      defaultCodeName={{"code": 46543000, "name": "RIO DE ONDAS - 46543000"}}
      defaultCategory="Área de drenagem"
      center={[-45.25811, -12.652125]}
      zoom={8}
      />
    </>
  );
}