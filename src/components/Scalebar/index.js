import React from 'react';

import { ScaleLine } from 'ol/control';

import { ScaleContainer } from './styles';

class Scalebar extends React.Component {
    scalebar = new ScaleLine({
        units: 'metric',
        bar: true,
        steps: 4,
        text: true,
        minWidth: 140,
    });

    componentDidMount() {
        this.scalebar.setTarget(document.getElementById('scalebar'));
        this.props.map.addControl(this.scalebar);
    }

    render() {
        return (
            <ScaleContainer>
                <div id="scalebar"/>
            </ScaleContainer>
        );
    }
  }

export default Scalebar;