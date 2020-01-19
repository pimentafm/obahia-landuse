import React from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

const { Option } = Select;

class Footer extends React.Component {
    state = {
        defaultProjection: this.props.projection,
        projections: ['EPSG:4326', 'EPSG:3857'],
    }

    mousePosition = new MousePosition({
        coordinateFormat: createStringXY(5),
        projection: 'EPSG:4326',
        className: 'mouse-position',
        undefinedHTML: '&nbsp;'
    });

    projectionChange = (datum) => {
        this.mousePosition.setProjection(datum);
    }

    componentDidMount() {
        this.mousePosition.setTarget(document.getElementById('mouse-position-coordinates'));
        this.props.map.addControl(this.mousePosition);
    }

    render () {
        return (
            <FooterContainer className="page-footer">
                <label id="mouse-position-label"> Coordenadas: </label>
                <label id="mouse-position-coordinates" className="mouse-position"></label>

                <label> Projeção: </label>
                <Select id="proj-select" className="select" defaultValue={this.state.defaultProjection} onChange={this.projectionChange}>
                    {this.state.projections.map(p => <Option key={p} value={p}>{p}</Option>)}
                </Select>
                
            </FooterContainer>
        );
    }
}

export default Footer;