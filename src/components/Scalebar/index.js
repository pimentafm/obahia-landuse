import React, { useState, useEffect } from 'react';

import { ScaleLine } from 'ol/control';

import { ScaleContainer } from './styles';

const Scalebar = props => {
    const [map] = useState(props.map);
    useEffect(() => {
        const scalebar = new ScaleLine({
            units: 'metric',
            bar: true,
            steps: 4,
            text: true,
            minWidth: 140,
        });
        scalebar.setTarget(document.getElementById('scalebar'));
        map.addControl(scalebar);
    }, [map]);

    return (
        <ScaleContainer>
            <div id="scalebar"/>
        </ScaleContainer>
    );
  }

export default Scalebar;