import React from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';
const { Option } = Select;

class Footer extends React.Component {
    state = {
        defaultUnit: ['degrees'],
        units: ['degrees', 'naltical', 'metric'],
    }
    render () {
        return (
            <FooterContainer className="page-footer">
                <Select id="select" defaultValue={this.state.defaultUnit} >
                    {this.state.units.map(u => <Option key={u} value={u}>{u}</Option>)}
                </Select>
            </FooterContainer>
        );
    }
}

export default Footer;