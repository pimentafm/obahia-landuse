import React, { Component } from "react";

import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import OSM from "ol/source/OSM";

import 'ol/ol.css';

import { MapContainer } from './styles';
import Card from '../../components/Card';

class Map extends Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCategory: this.props.defaultCategory,
    center: [-45.25811, -12.652125],
      zoom: 8,
      layers: []
  };

  landsat = new TileLayer({
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/landsatRegion.map',
      params: {
        'year': this.state.defaultYear,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })
  });

  landuse = new TileLayer({
    visible: false,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/landuseRegion.map',
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
    target: null,
    layers: [this.osm, this.landsat, this.landuse],
    view: this.view
  });

  handleYears = year => {
    /*
      Change the map year and update the map layer
    */
    this.setState({defaultYear: year});

    const new_source = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/landsatRegion.map',
      params: {
        'year': year,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })

    this.landsat.setSource(new_source);
    this.landsat.getSource().updateParams({ "time": Date.now() });
    this.landsat.changed();
    
    console.log('Chamando o ano selecionado do card: ' + year);
    console.log('state: ' + this.state.defaultYear);
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
    this.updateMap(); // Update map on render?
    return (
        <MapContainer id="map">
          <Card key="card" defaultYear={2018} handleYears={this.handleYears} defaultCategory="Region"/>
        </MapContainer>
    );
  }
}

export default Map;