import React, { useState, useCallback } from 'react';
import Switch from 'react-switch';

import { IconContext } from 'react-icons';
import { FaArrowAltCircleDown, FaDatabase } from 'react-icons/fa';

import { Divider, Popover, Slider } from 'antd';
import 'antd/dist/antd.css';

import Legend from './Legend';

import { Container } from './styles';

import { useTranslation } from 'react-i18next';

interface LayerSwitcherProps {
  name: string;
  label: string;
  downloadURL?: string;
  layerIsVisible: boolean;
  legendIsVisible: boolean;
  layerInfoIsVisible: boolean;
  switchColor: string;
  handleLayerOpacity(opacity: number, lyr_name: string): void;
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
  handleLayerOpacity,
  handleLayerVisibility,
}) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(layerIsVisible);

  const handleVisibility = useCallback(
    (_e, _obj, id) => {
      visible ? setVisible(false) : setVisible(true);
      handleLayerVisibility(!visible, id);
    },
    [visible, handleLayerVisibility],
  );

  const handleOpacity = useCallback(
    opacity => {
      handleLayerOpacity(opacity, name);
    },
    [name, handleLayerOpacity],
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
            {/* <Popover placement="right" content="Informações sobre a camada">
              <FaInfoCircle
                id="close-popup"
                onClick={() => alert('Metadados')}
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Popover> */}

            <Popover placement="right" content={t('tooltip_download')}>
              <FaArrowAltCircleDown
                id="close-popup"
                onClick={() => window.open(downloadURL, '_self')}
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Popover>

            <Popover placement="right" content={t('tooltip_ftp')}>
              <FaDatabase
                id="close-popup"
                onClick={() =>
                  window.open(
                    downloadURL?.substring(0, downloadURL.lastIndexOf('/')),
                    '_blank',
                  )
                }
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Popover>
          </div>
        </IconContext.Provider>
      </>
    );
  }

  return (
    <Container id="layerswitcher">
      <div className="layer-div">
        <label>{label}</label>

        <div className="slider-switcher">
          <Slider
            defaultValue={1}
            min={0}
            max={1}
            step={0.1}
            tooltipVisible={false}
            style={{ width: 40, margin: 5, marginRight: 15 }}
            onChange={handleOpacity}
          />
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
      </div>

      {legend}

      {layerInfo}
    </Container>
  );
};

export default LayerSwitcher;
