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
  watershed: string;
}

const CardPlot: React.FC<CardProps> = ({ year, watershed, ishidden }) => {
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
          {t('stackplot_title_watershed')}{' '}
          {watershed.charAt(0).toUpperCase() + watershed.slice(1)}{' '}
          {t('stackplot_link_watershed')} (1990-2020)
        </label>
        <StackPlot watershed={watershed} tableName="landuse" />

        <label>
          {t('barplot_title_watershed')}{' '}
          {watershed.charAt(0).toUpperCase() + watershed.slice(1)}{' '}
          {t('barplot_link_watershed')} {year}
        </label>
        <Barplot year={year} watershed={watershed} tableName="landuse" />
        <div className="final-space"></div>
      </Content>
    </Container>
  );
};

export default CardPlot;
