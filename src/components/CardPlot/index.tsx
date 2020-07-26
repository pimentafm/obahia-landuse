import React, { useState, useCallback } from 'react';

import { Popover } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container } from './styles';

import Barplot from './Barplot';
import StackPlot from './StackPlot';

interface CardProps {
  year: number;
}

const CardPlot: React.FC<CardProps> = ({ year }) => {
  const [hidden, setHidden] = useState(0);

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
        <Popover placement="leftTop" content="Esconde/Mostra gráficos">
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Popover>
      </div>

      <label>Cobertura e uso do solo (1990 - 2018)</label>
      <StackPlot tableName="landuse" />

      <label>Cobertura e uso do solo {year}</label>
      <Barplot year={year} tableName="landuse" />
    </Container>
  );
};

export default CardPlot;
