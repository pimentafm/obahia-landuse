import React, { useEffect } from 'react';

import OlMap from 'ol/Map';

import Zoom from 'ol/control/Zoom';

import { Container } from './styles';

interface ZoomControlProps {
  ishidden: number;
  map: OlMap;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ ishidden, map }) => {
  useEffect(() => {
    const zoomControl = new Zoom({
      className: 'zoom-controls',
      target: 'zoomcontrols',
      zoomInTipLabel: '',
      zoomOutTipLabel: '',
    });

    map.addControl(zoomControl);
  }, [map]);

  return (
    <Container ishidden={ishidden}>
      <div id="zoomcontrols" />
    </Container>
  );
};

export default ZoomControl;
