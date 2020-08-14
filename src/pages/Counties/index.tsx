import React from 'react';

import Map from '../../components/MapCounty';

const Counties: React.FC = () => {
  return (
    <Map
      defaultYear={2018}
      defaultCategory="counties"
      defaultCodeName={{ code: 2903201, name: 'BARREIRAS - 2903201' }}
    />
  );
};

export default Counties;
