import React from 'react';

import 'antd/dist/antd.css';

import { Switch } from 'antd';
import { LayerContainer}  from './styles';
import Legend from '../../components/Legend';

class LayerSwitcher extends React.Component {
    render () {
        let legend;

        if (this.props.legend) {
            legend = <Legend />
        } else {
            legend = null;
        }

        return (
            <LayerContainer>
                <div className="layer-div">
                    <label>{this.props.name}</label>
                    <Switch defaultChecked={this.props.checked} onChange={this.props.switcher} />
                </div>
                
                {legend}

            </LayerContainer>
        )
    }
}

export default LayerSwitcher;