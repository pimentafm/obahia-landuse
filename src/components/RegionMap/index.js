import React, { Component } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import OSM from "ol/source/OSM";
//import MousePosition from 'ol/control/MousePosition';
//import { createStringXY } from 'ol/coordinate';

import 'ol/ol.css';

import { MapContainer } from './styles';
import Menu from '../../components/Menu';
import Scalebar from '../../components/Scalebar';
import Footer from '../../components/Footer';

import Stackplot from '../../components/Stackplot';
import Barplot from '../../components/Barplot';

class RegionMap extends Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCategory: this.props.defaultCategory,
    menuIsHidden: false,
    center: [-45.25811, -12.652125],
      zoom: 8,
      layers: []
  };

  landsat = new TileLayer({
    visible: false,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatRegion.map',
      params: {
        'year': this.state.defaultYear,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })
  });

  landuse = new TileLayer({
    visible: true,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map',
      params: {
        'year': this.state.defaultYear,
        'LAYERS': 'Landuse',
      },
      serverType: 'mapserver'
    })
  });

  view = new View({
    projection: 'EPSG:4326',
    center: this.state.center,
    zoom: this.state.zoom
  });

  osm = new TileLayer({ source: new OSM() });

  map = new OlMap({
    controls: [],
    target: null,
    layers: [this.osm, this.landsat, this.landuse],
    view: this.view
  });

  onOffLandsat = (evt) => {
    this.landsat.setVisible(evt);
  }

  onOffLanduse = (evt) => {
    this.landuse.setVisible(evt);
  }

  handleYears = year => {
    /*
      Change the map year and update the map layer
    */
    this.setState({defaultYear: year});

    const new_landsat = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatRegion.map',
      params: {
        'year': year,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })

    const new_landuse = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map',
      params: {
        'year': year,
        'LAYERS': 'Landuse',
      },
      serverType: 'mapserver'
    })

    this.landuse.setSource(new_landuse);
    this.landuse.getSource().updateParams({ "time": Date.now() });
    this.landuse.changed();

    this.landsat.setSource(new_landsat);
    this.landsat.getSource().updateParams({ "time": Date.now() });
    this.landsat.changed();
  }

  updateMap() {
    this.map.getView().setCenter(this.state.center);
    this.map.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.map.setTarget("map");

    // Listen to map changes
    this.map.on("moveend", () => {
      let center = this.map.getView().getCenter();
      let zoom = this.map.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.map.getView().getCenter();
    let zoom = this.map.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;

    return true;
  }

  userAction() {
    this.setState({ center: [-45.56258, -20.125457], zoom: 5 });
  }

  render() {

    return (
        <MapContainer id="map">
          <Menu 
            key="card" 
            isHidden={this.state.menuIsHidden}
            defaultYear={this.state.defaultYear} 
            handleYears={this.handleYears} 
            defaultCategory="Região" 
            onOffLandsat={this.onOffLandsat} 
            onOffLanduse={this.onOffLanduse}
            map={this.map}
          />

          <Scalebar 
            key="scalebar"
            map={this.map}
          />

          <div id="plots" className="plot-card">
            <Stackplot 
              key="stackplot"
            />
            
            <Barplot 
              key={"barplot"+ this.state.defaultYear}
              defaultYear={this.state.defaultYear}
            />

          </div>

          <Footer 
            key="footer"
            map={this.map}
            projection='EPSG:4326'
          />
        </MapContainer>
    );
  }
}

export default RegionMap;