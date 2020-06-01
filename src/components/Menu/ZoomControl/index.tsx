import React, { useEffect } from 'react';

import OlMap from 'ol/Map';

import Zoom from 'ol/control/Zoom';

import { Container } from './styles';

interface ZoomControlProps {
  ishidden: number;
  map: OlMap;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ ishidden, map }) => {
  const zoomControl = new Zoom({
    className: 'zoom-controls',
    zoomInTipLabel: '',
    zoomOutTipLabel: '',
  });

  useEffect(() => {
    zoomControl.setTarget('zoomcontrols');
    map.addControl(zoomControl);
  }, [map, zoomControl]);

  return (
    <Container>
      <div id="zoomcontrols" />
    </Container>
  );
};

export default ZoomControl;
