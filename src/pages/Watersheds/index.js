import React from 'react';

import WatershedsMap from '../../components/WatershedsMap';

export default function Region() {
  return (
    <>
    <WatershedsMap 
      id="map" 
      defaultYear={2018}
      defaultCode= {76424}
      defaultCategory="Bacia hidrográfica"
      />
    </>
  );
}

