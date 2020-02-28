import React from 'react';

import CountyMap from '~/components/CountyMap';

export default function Region() {
  return (
    <>
    <CountyMap 
      id="map" 
      defaultYear={2018}
      defaultCodeName={{"code": 2903201, "name": "BARREIRAS - 2903201"}}
      defaultCategory="Municípios"
      center={[-45.37787, -12.22042]}
      extent={[-46.3978, -12.4270, -44.5798, -11.6192]}
      zoom={8}
      />
    </>
  );
}
