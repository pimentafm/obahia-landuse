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

      {/* <Divider style={{ margin: `5px 0px 5px 0px` }} /> */}
    </Container>
  );
};

export default LayerSwitcher;
