import React, { useState, useCallback } from 'react';

import { Switch } from 'antd';
import 'antd/dist/antd.css';

import Legend from './Legend';

import { Container } from './styles';

interface LayerSwitcherProps {
  name: string;
  label: string;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({ name, label }) => {
  const [visible, setVisible] = useState(true);

  const handleLegend = useCallback(() => {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [visible]);

  return (
    <Container id="layerswitcher">
      <div className="layer-div">
        <label>{label}</label>
        <Switch defaultChecked={true} onChange={handleLegend} />
      </div>

      <Legend name={name} isvisible={visible}></Legend>
    </Container>
  );
};

export default LayerSwitcher;
