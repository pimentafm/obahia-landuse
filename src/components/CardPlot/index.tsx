import React, { useState, useCallback } from 'react';

import { Tooltip } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container } from './styles';

import Barplot from './Barplot';

const CardPlot: React.FC = () => {
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
        <Tooltip placement="leftTop" title="Esconde/Mostra gráficos">
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Tooltip>
      </div>

      <Barplot />
    </Container>
  );
};

export default CardPlot;