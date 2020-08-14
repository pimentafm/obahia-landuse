import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';

import OlMap from 'ol/Map';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

import { Container } from './styles';

import { useTranslation } from 'react-i18next';

interface FooterProps {
  id: string;
  map: OlMap;
}

const Footer: React.FC<FooterProps> = ({ id, map, ...rest }) => {
  const { t } = useTranslation();

  const [mousePosition] = useState(
    new MousePosition({
      coordinateFormat: createStringXY(5),
      projection: 'EPSG:4326',
      className: 'mouse-position',
      undefinedHTML: '&nbsp;',
    }),
  );

  useEffect(() => {
    mousePosition.setTarget('mouse-position-coordinates');
    map.addControl(mousePosition);
  });

  return (
    <Container id={id}>
      <div id="mouse-position-coordinates" className="mouse-position" />
      <Popover placement="leftTop" content={t('tooltip_coords')}>
        <label>EPSG: 4326</label>
      </Popover>
    </Container>
  );
};

export default Footer;