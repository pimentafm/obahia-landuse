import React from 'react';

import {
  GiMeshBall,
  GiStack,
  GiRaining,
  GiNetworkBars,
  GiPieChart,
} from 'react-icons/gi';
import { Popover } from 'antd';

import { Container } from './styles';

interface ToolsMenuProps {
  ishidden: number;
}

const ToolsMenu: React.FC<ToolsMenuProps> = ({ ishidden }) => {
  return (
    <Container ishidden={ishidden}>
      <Popover
        placement="right"
        title="Séries temporais de mapas"
        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Uso do Solo</span>
            <a href="http://corrente.dea.ufv.br/biomass">Biomassa</a>
          </div>
        }
      >
        <GiStack
          className="text-icon"
          style={{ fontSize: 25, color: '#1f5582', cursor: 'pointer' }}
        />
      </Popover>

      <Popover
        placement="right"
        content="Previsão do início da estação chuvosa"
      >
        <GiRaining
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://corrente.dea.ufv.br/onset', '_self')
          }
        />
      </Popover>

      <Popover placement="right" content="Previsão de vazões">
        <GiNetworkBars
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://corrente.dea.ufv.br/hidro', '_self')
          }
        />
      </Popover>

      <Popover
        placement="right"
        content="Visualizador do modelo de águas subterrâneas"
      >
        <GiMeshBall
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://corrente.dea.ufv.br/mfview', '_self')
          }
        />
      </Popover>

      <Popover placement="right" content="outro">
        <GiPieChart
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() => window.open('http://corrente.dea.ufv.br', '_self')}
        />
      </Popover>
    </Container>
  );
};

export default ToolsMenu;
