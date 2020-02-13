import React from 'react';

import WatershedMap from '../../components/WatershedMap';

export default function Region() {
  return (
    <>
    <WatershedMap 
      id="map" 
      defaultYear={2018}
      defaultCode= {76424}
      defaultCategory="Bacia hidrográfica"
      />
    </>
  );
}

