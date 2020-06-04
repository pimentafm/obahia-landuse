import React, { useEffect } from 'react';

import OlMap from 'ol/Map';
import { ScaleLine } from 'ol/control';

import { Container } from './styles';

interface ScalebarProps {
  id: string;
  map: OlMap;
}

const ScaleBar: React.FC<ScalebarProps> = ({ id, map, ...rest }) => {
  useEffect(() => {
    const scalebar = new ScaleLine({
      units: 'metric',
      bar: true,
      steps: 4,
      text: true,
      minWidth: 140,
    });
    scalebar.setTarget('scalebar');
    map.addControl(scalebar);
  }, [map]);

  return (
    <Container>
      <div id="scalebar" />
    </Container>
  );
};

export default ScaleBar;
