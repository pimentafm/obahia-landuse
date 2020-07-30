import React, { useState, useCallback } from 'react';

import { Popover } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container, Content } from './styles';

import Barplot from './Barplot';
import StackPlot from './StackPlot';

interface CardProps {
  ishidden: number;
  year: number;
  code: number;
}

const CardPlot: React.FC<CardProps> = ({ year, code, ishidden }) => {
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
        <Popover placement="leftTop" content="Esconde/Mostra gráficos">
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Popover>
      </div>

      <Content>
        <label>Cobertura e uso do solo (1990 - 2018)</label>
        <StackPlot code={code} tableName="landuse" />

        <label>Cobertura e uso do solo {year}</label>
        <Barplot year={year} code={code} tableName="landuse" />
        <div className="final-space"></div>
      </Content>
    </Container>
  );
};

export default CardPlot;
