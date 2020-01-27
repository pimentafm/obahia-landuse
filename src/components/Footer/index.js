import React, { useState, useEffect} from 'react';

import { FooterContainer } from './styles';
import { Select } from 'antd';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

const { Option } = Select;

const Footer = props => {
    const [defaultProjection] = useState(props.projection);
    const [projections] = useState(['EPSG:4326', 'EPSG:3857']);
    const [map] = useState(props.map);

    useEffect(() => {
        mousePosition.setTarget(document.getElementById('mouse-position-coordinates'));
        map.addControl(mousePosition);
    });

    const mousePosition = new MousePosition({
        coordinateFormat: createStringXY(5),
        projection: 'EPSG:4326',
        className: 'mouse-position',
        undefinedHTML: '&nbsp;'
    });

    const projectionChange = (datum) => {
        mousePosition.setProjection(datum);
    }

    return (
        <FooterContainer className="page-footer">
            <label id="mouse-position-label"> Coordenadas: </label>
            <label id="mouse-position-coordinates" className="mouse-position"></label>

            <label> Projeção: </label>
            <Select id="proj-select" className="select" defaultValue={defaultProjection} onChange={projectionChange}>
                {projections.map(p => <Option key={p} value={p}>{p}</Option>)}
            </Select>
                
        </FooterContainer>
    );
}

export default Footer;