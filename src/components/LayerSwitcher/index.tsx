import React, { useState, useCallback } from 'react';

import { Switch } from 'antd';
import 'antd/dist/antd.css';

import Legend from './Legend';

import { Container } from './styles';

interface LayerSwitcherProps {
  name: string;
  label: string;
  handleLayerVisibility(evt: boolean): void;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({ name, label, handleLayerVisibility }) => {
  const [visible, setVisible] = useState(true);

  const handleLegend = useCallback(() => {
    (visible ? setVisible(false) : setVisible(true))

  }, [visible]);
  

  return (
    <Container id="layerswitcher">
      <div className="layer-div">
        <label>{label}</label>
        <Switch defaultChecked={true} onChange={handleLayerVisibility} />
      </div>

      <Legend name={name} isvisible={visible}></Legend>
    </Container>
  );
};

export default LayerSwitcher;
