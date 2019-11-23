import React, { Component } from "react";

import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import OSM from "ol/source/OSM";

import 'ol/ol.css';

import { Container } from './styles';


class Map extends Component {
    state = {
        center: [-45.25811, -12.652125],
        zoom: 8,
        layers: []
    };

    landsat = new TileLayer({
      source: new TileWMS({
          url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/landsatRegion.map',
          params: {
              'year': this.props.year,
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
              'year': this.props.year,
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
        <Container id="map" />
    );
  }
}

export default Map;