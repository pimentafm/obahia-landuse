import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { wms } from '../../../services';

import { Container } from './styles';

import { useTranslation } from 'react-i18next';

interface LegendProps {
  name: string;
  isvisible: boolean;
}

const Legend: React.FC<LegendProps> = ({ name, isvisible }) => {
  const { t } = useTranslation();
  
  const [legendHTML, setlegendHTML] = useState([]);

  useEffect(() => {
    wms
      .get(name + `Region.map&mode=legend&year=2018`, {
        responseType: 'text',
      })
      .then(res => {
        let html = res.data;

        html = html.replace('Formações florestais', t('label_forest'))
                   .replace('Formações savânicas', t('label_savanna'))
                   .replace('Formações campestres', t('label_grasslands'))
                   .replace('Mosaico de agricultura ou pastagem', t('label_mosaic'))
                   .replace('Agricultura de sequeiro', t('label_rainfed'))
                   .replace('Agricultura irrigada', t('label_irrigated'))
                   .replace('Pastagem', t('label_pasture'))
                   .replace(`Corpos d'água`, t('label_water'))
                   .replace('Área urbana/Construções rurais', t('label_urban'));

        html = ReactHtmlParser(html);

        setlegendHTML(html);
      });
  }, [name, t]);
  return (
    <Container id="layerswitcher" isvisible={isvisible}>
      {legendHTML}
    </Container>
  );
};

export default Legend;
