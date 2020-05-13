import React from 'react';

import RegionMap from '~/components/RegionMap';

export default function Region() {
  return (
    <>
    <RegionMap 
      id="map" 
      defaultYear={2018} 
      defaultCategory="Região"
      center={[-45.25811, -12.652125]}
      zoom={8}
    />
    </>
  );
}
