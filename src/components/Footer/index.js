import React from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';
const { Option } = Select;

class Footer extends React.Component {
    state = {
        defaultProjection: this.props.projection,
        projections: ['EPSG:4326', 'EPSG:3857'],
    }
    render () {
        return (
            <FooterContainer className="page-footer">
                <label> Projeção: </label>
                <Select id="proj-select" className="select" defaultValue={this.state.defaultProjection} onChange={this.props.projectionChange}>
                    {this.state.projections.map(p => <Option key={p} value={p}>{p}</Option>)}
                </Select>
            </FooterContainer>
        );
    }
}

export default Footer;