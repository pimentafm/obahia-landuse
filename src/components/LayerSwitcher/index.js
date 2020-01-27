import React, { useState } from 'react';

import 'antd/dist/antd.css';

import { Switch } from 'antd';
import { LayerContainer}  from './styles';
import Legend from '../../components/Legend';

const LayerSwitcher = props => {
    const [checked] = useState(props.checked);
    const [legend_is_visible, setLegendVisible] = useState(props.legend);
    const [switcher] = useState(props.switcher);
    const [name] = useState(props.name);

    const handleLegend = () => {
        if(legend_is_visible === true) {
            setLegendVisible(false);
        } else {
            setLegendVisible(true);
        } 
    }

    let legend;

    if (legend_is_visible && checked) {
        legend = <Legend />
    } else {
        legend = null;
    }

    return (
        <LayerContainer legend_is_visible={legend_is_visible}>
            <div className="layer-div">
                <label>{name}</label>
                <Switch defaultChecked={checked} onClick={handleLegend} onChange={switcher} />
            </div>
                
            {legend}

        </LayerContainer>
    )
}

export default LayerSwitcher;