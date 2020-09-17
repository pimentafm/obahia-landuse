import React, { useState, useCallback } from 'react';

import { Popover } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container, Content } from './styles';

import Barplot from './Barplot';
import StackPlot from './StackPlot';

import { useTranslation } from 'react-i18next';

interface CardProps {
  ishidden: number;
  year: number;
  code: number;
  name: string;
}

const CardPlot: React.FC<CardProps> = ({ year, code, name, ishidden }) => {
  const { t } = useTranslation();

  const [hidden, setHidden] = useState(ishidden);

  const handleCardPlot = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  return (
    <Container id="cardplot" ishidden={hidden}>
      <div id="handleCardplot">
        <Popover placement="leftTop" content={t('tooltip_menu_plot')}>
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Popover>
      </div>
      <Content>
        <label>
          {t('stackplot_title_drainage')} {name} {t('stackplot_link_drainage')}{' '}
          (1990-2020)
        </label>
        <StackPlot code={code} tableName="landuse" />

        <label>
          {t('barplot_title_drainage')} {name} {t('barplot_link_drainage')}{' '}
          {year}
        </label>
        <Barplot year={year} code={code} tableName="landuse" />
        <div className="final-space"></div>
      </Content>
    </Container>
  );
};

export default CardPlot;
