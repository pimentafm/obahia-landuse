import React, { useState, useCallback } from 'react';

import { IconContext } from 'react-icons';
import { FaInfoCircle, FaArrowAltCircleDown, FaDatabase } from 'react-icons/fa';

import { Switch, Divider } from 'antd';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import Legend from './Legend';

import { Container } from './styles';

interface LayerSwitcherProps {
  name: string;
  label: string;
  handleLayerVisibility(evt: boolean): void;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  name,
  label,
  handleLayerVisibility,
}) => {
  const [visible, setVisible] = useState(true);

  const handleVisibility = useCallback(() => {
    visible ? setVisible(false) : setVisible(true);
    handleLayerVisibility(!visible);
  }, [visible, handleLayerVisibility]);

  return (
    <Container id="layerswitcher">
      <div className="layer-div">
        <label>{label}</label>
        <Switch defaultChecked={true} onChange={handleVisibility} />
      </div>

      <Legend name={name} isvisible={visible}></Legend>

      <Divider style={{ margin: `5px 0px 5px 0px` }} />

      <IconContext.Provider value={{ color: '#1f5582' }}>
        <div className="layer-info">
          <Tooltip placement="right" title="Informações sobre a camada">
            <FaInfoCircle
              id="close-popup"
              onClick={() => alert('Layer info')}
              style={{
                fontSize: '20px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>

          <Tooltip placement="right" title="Download da camada">
            <FaArrowAltCircleDown
              id="close-popup"
              onClick={() => alert('Layer download')}
              style={{
                fontSize: '20px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>

          <Tooltip placement="right" title="Download da série temporal">
            <FaDatabase
              id="close-popup"
              onClick={() => alert('Download FTP')}
              style={{
                fontSize: '20px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        </div>
      </IconContext.Provider>
    </Container>
  );
};

export default LayerSwitcher;
