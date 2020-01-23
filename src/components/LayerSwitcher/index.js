import React from 'react';

import 'antd/dist/antd.css';

import { Switch } from 'antd';
import { LayerContainer}  from './styles';
import Legend from '../../components/Legend';

class LayerSwitcher extends React.Component {
    state = {
        legend_is_visible: this.props.legend
    }

    handleLegend = () => {
        if(this.state.legend_is_visible === true) {
            this.setState({legend_is_visible: false});
            return false;
        } else {
            this.setState({legend_is_visible: true});
            return true;
        } 

    }

    render () {
        let legend;

        if (this.props.legend) {
            legend = <Legend />
        } else {
            legend = null;
        }

        return (
            <LayerContainer legend_is_visible={this.state.legend_is_visible}>
                <div className="layer-div">
                    <label>{this.props.name}</label>
                    <Switch defaultChecked={this.props.checked} onClick={this.handleLegend} onChange={this.props.switcher} />
                </div>
                
                {legend}

            </LayerContainer>
        )
    }
}

export default LayerSwitcher;