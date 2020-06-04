import React from 'react';

import Map from '../../components/MapWatershed';

const Watershed: React.FC = () => {
  return <Map defaultYear={2018} defaultCategory="Bacias hidrográficas" />;
};

export default Watershed;
