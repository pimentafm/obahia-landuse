import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { wms } from '../../../services';

import { Container } from './styles';

interface LegendProps {
  name: string;
  isvisible: boolean;
}

const Legend: React.FC<LegendProps> = ({ name, isvisible }) => {
  const [legendHTML, setlegendHTML] = useState([]);

  useEffect(() => {
    wms
      .get(name + `Region.map&mode=legend&year=2018`, {
        responseType: 'text',
      })
      .then(res => {
        let html = res.data;

        html = ReactHtmlParser(html);

        setlegendHTML(html);
      });
  }, [name]);
  return (
    <Container id="layerswitcher" isvisible={isvisible}>
      {legendHTML}
    </Container>
  );
};

export default Legend;
