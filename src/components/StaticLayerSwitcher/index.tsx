import React, { useState, useCallback } from 'react';
import Switch from 'react-switch';

import { IconContext } from 'react-icons';
import { FaInfoCircle, FaArrowAltCircleDown, FaDatabase } from 'react-icons/fa';

import { Divider } from 'antd';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import Legend from './Legend';

import { Container } from './styles';

interface LayerSwitcherProps {
  name: string;
  label: string;
  downloadURL?: string;
  layerIsVisible: boolean;
  legendIsVisible: boolean;
  layerInfoIsVisible: boolean;
  switchColor: string;
  handleLayerVisibility(e: boolean, obj: Object): void;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  name,
  label,
  downloadURL,
  layerIsVisible,
  legendIsVisible,
  layerInfoIsVisible,
  switchColor,
  handleLayerVisibility,
}) => {
  const [visible, setVisible] = useState(layerIsVisible);

  const handleVisibility = useCallback(
    (_e, _obj, id) => {
      visible ? setVisible(false) : setVisible(true);
      handleLayerVisibility(!visible, id);
    },
    [visible, handleLayerVisibility],
  );

  let legend = undefined;

  if (legendIsVisible) {
    legend = <Legend name={name} isvisible={visible}></Legend>;
  }

  let layerInfo = undefined;

  if (layerInfoIsVisible) {
    layerInfo = (
      <>
        <Divider style={{ margin: `5px 0px 5px 0px` }} />

        <IconContext.Provider value={{ color: '#1f5582' }}>
          <div className="layer-info">
            <Tooltip placement="right" title="Informações sobre a camada">
              <FaInfoCircle
                id="close-popup"
                onClick={() => alert('Metadados')}
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>

            <Tooltip placement="right" title="Download da camada">
              <FaArrowAltCircleDown
                id="close-popup"
                onClick={() => window.open(downloadURL, '_self')}
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>

            <Tooltip placement="right" title="Download da série temporal">
              <FaDatabase
                id="close-popup"
                onClick={() =>
                  window.open(`ftp://obahia.dea.ufv.br/${name}`, '_blank')
                }
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          </div>
        </IconContext.Provider>
      </>
    );
  }

  return (
    <Container id="layerswitcher">
      <div className="layer-div">
        <label>{label}</label>

        <Switch
          id={name}
          checked={visible}
          handleDiameter={16}
          onChange={handleVisibility}
          onColor={switchColor}
          checkedIcon={false}
          uncheckedIcon={false}
          height={22}
          width={44}
        />
      </div>

      {legend}

      {layerInfo}
    </Container>
  );
};

export default LayerSwitcher;
