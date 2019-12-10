import React from 'react';

import Zoom from 'ol/control/Zoom';

import { ZoomContainer } from './styles';

import 'ol/ol.css';

class ZoomInOut extends React.Component {
    state = {
        isHidden: this.props.isHidden,
    };

    zoom = new Zoom({
        className: 'zoom-controls',
    });
    
    componentDidMount() {
        this.zoom.setTarget(document.getElementById('zoomInOut'));
        this.props.map.addControl(this.zoom);
    }

    teste = () => {
        console.log(this.state.isHidden)
    }
    
    render() {
        return (
            <ZoomContainer isHidden={this.state.isHidden} onClick={this.teste}>
                <div id="zoomInOut" />
            </ZoomContainer>
        );
    }
  }

export default ZoomInOut;
