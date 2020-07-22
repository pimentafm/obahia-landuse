import React from 'react';

import {
  GiMeshBall,
  GiStack,
  GiRaining,
  GiNetworkBars,
  GiPieChart,
} from 'react-icons/gi';
import { Tooltip } from 'antd';

import { Container } from './styles';

interface ToolsMenuProps {
  ishidden: number;
}

const ToolsMenu: React.FC<ToolsMenuProps> = ({ ishidden }) => {
  return (
    <Container ishidden={ishidden}>
      <Tooltip placement="bottomLeft" title="Séries temporais de mapas">
        <GiStack
          className="text-icon"
          style={{ fontSize: 25, color: '#1f5582', cursor: 'pointer' }}
        />
      </Tooltip>

      <Tooltip
        placement="bottomLeft"
        title="Previsão do início da estação chuvosa"
      >
        <GiRaining
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          onClick={() => window.open('http://obahia.dea.ufv.br/onset', '_self')}
        />
      </Tooltip>

      <Tooltip placement="bottomLeft" title="Previsão de vazões">
        <GiNetworkBars
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          onClick={() => window.open('http://obahia.dea.ufv.br/hidro', '_self')}
        />
      </Tooltip>

      <Tooltip
        placement="bottomLeft"
        title="Visualizador do modelo de águas subterrâneas"
      >
        <GiMeshBall
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://obahia.dea.ufv.br/mfview', '_self')
          }
        />
      </Tooltip>

      <Tooltip placement="bottomLeft" title="outro">
        <GiPieChart
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          onClick={() => window.open('http://obahia.dea.ufv.br', '_self')}
        />
      </Tooltip>
    </Container>
  );
};

export default ToolsMenu;
