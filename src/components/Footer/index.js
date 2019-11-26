import React from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';
const { Option } = Select;

class Footer extends React.Component {
    state = {
        defaultUnit: this.props.defaultUnit,
        units: ['degrees', 'nautical', 'metric'],
    }
    render () {
        return (
            <FooterContainer className="page-footer">
                <Select id="select" defaultValue={this.state.defaultUnit} onChange={this.props.scaleUnitChange}>
                    {this.state.units.map(u => <Option key={u} value={u}>{u}</Option>)}
                </Select>
            </FooterContainer>
        );
    }
}

export default Footer;