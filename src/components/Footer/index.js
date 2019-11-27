import React from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';
const { Option } = Select;

class Footer extends React.Component {
    state = {
        defaultProjection: this.props.projection,
        projections: ['EPSG:4326', 'EPSG:3857'],
        defaultUnit: this.props.defaultUnit,
        units: ['degrees', 'nautical', 'metric'],
    }
    render () {
        return (
            <FooterContainer className="page-footer">
                <label>Escala: </label>
                <Select id="unit-select" className="select" defaultValue={this.state.defaultUnit} onChange={this.props.scaleUnitChange}>
                    {this.state.units.map(u => <Option key={u} value={u}>{u}</Option>)}
                </Select>
                <label> Projeção: </label>
                <Select id="proj-select" className="select" defaultValue={this.state.defaultProjection} onChange={this.props.projectionChange}>
                    {this.state.projections.map(p => <Option key={p} value={p}>{p}</Option>)}
                </Select>
            </FooterContainer>
        );
    }
}

export default Footer;