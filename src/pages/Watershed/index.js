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
      center={[-45.25811, -12.652125]}
      zoom={8}
      />
    </>
  );
}