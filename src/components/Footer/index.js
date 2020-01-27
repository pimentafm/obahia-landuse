import React, { useState, useEffect} from 'react';

import { FooterContainer } from './styles';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

const Footer = props => {
    const [defaultProjection] = useState('EPSG:4326');
    const [map] = useState(props.map);

    const mousePosition = new MousePosition({
        coordinateFormat: createStringXY(5),
        projection: defaultProjection,
        className: 'mouse-position',
        undefinedHTML: '&nbsp;'
    });

    useEffect(() => {
        mousePosition.setTarget(document.getElementById('mouse-position-coordinates'));
        map.addControl(mousePosition);
    });

    return (
        <FooterContainer className="page-footer">
            <label id="mouse-position-label"> Coordenadas: </label>
            <label id="mouse-position-coordinates" className="mouse-position"></label>

            <label> Projeção: EPSG: 4326</label>   
        </FooterContainer>
    );
}

export default Footer;