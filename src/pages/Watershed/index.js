import React from 'react';

import WatershedMap from '~/components/WatershedMap';

export default function Region() {
  return (
    <>
    <WatershedMap 
      id="map" 
      defaultYear={2018}
      defaultWatershed="grande"
      defaultCategory="Bacia hidrográfica"
      center={[-45.034,-11.68]}
      zoom={8}
      />
    </>
  );
}