import React, { Component } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import OSM from "ol/source/OSM";

import oba from '../../services/api';

import 'ol/ol.css';

import { MapContainer } from './styles';
import Menu from '../../components/Menu';
import Scalebar from '../../components/Scalebar';
import Footer from '../../components/Footer';

import Stackplot from '../../components/Stackplot';
import Barplot from '../../components/Barplot';
class WatershedsMap extends Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCode: this.props.defaultCode,
    defaultCategory: this.props.defaultCategory,
    menuIsHidden: false,
    center: [-45.25811, -12.652125],
      zoom: 8,
      layers: []
  };

  landsat = new TileLayer({
    visible: false,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatWatersheds.map',
      params: {
        'year': this.state.defaultYear,
        'code': this.state.defaultCode,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })
  });

  landuse = new TileLayer({
    visible: true,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseWatersheds.map',
      params: {
        'year': this.state.defaultYear,
        'code': this.state.defaultCode,
        'LAYERS': 'Landuse',
      },
      serverType: 'mapserver'
    })
  });

  watersheds = new TileLayer({
    visible: true,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/watersheds.map&REQUEST=GetCapabilities',
      params: {
        'code': this.state.defaultCode,
        'LAYERS': 'watersheds',
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

  map2 = new OlMap({
    controls: [],
    target: null,
    layers: [this.osm, this.landsat, this.landuse, this.watersheds],
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
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatWatersheds.map',
      params: {
        'year': year,
        'code': this.state.defaultCode,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })

    const new_landuse = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseWatersheds.map',
      params: {
        'year': year,
        'code': this.state.defaultCode,
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

  handleCodes = code => {
    /*
      Change the map year and update the map layer
    */
    this.setState({defaultCode: code});

    const new_landsat = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatWatersheds.map',
      params: {
        'year': this.state.defaultYear,
        'code': code,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })

    const new_landuse = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseWatersheds.map',
      params: {
        'year': this.state.defaultYear,
        'code': code,
        'LAYERS': 'Landuse',
      },
      serverType: 'mapserver'
    })

    const new_watershed = new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/watersheds.map',
      params: {
        'code': code,
        'LAYERS': 'watersheds',
      },
      serverType: 'mapserver'
    })

    this.landuse.setSource(new_landuse);
    this.landuse.getSource().updateParams({ "time": Date.now() });
    this.landuse.changed();

    this.landsat.setSource(new_landsat);
    this.landsat.getSource().updateParams({ "time": Date.now() });
    this.landsat.changed();

    this.watersheds.setSource(new_watershed);
    this.watersheds.getSource().updateParams({ "time": Date.now() });
    this.watersheds.changed();

    oba.post('watersheds/', {
      code: code,
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then(response => {
      let cx = response.data[0].cx;
      let cy = response.data[0].cy;

      this.setState({center:[cx, cy]});
      this.setState({zoom: 12})
    })
    .catch(e => {
    this.errors.push(e)
    })
  }

  updateMap() {
    this.map2.getView().setCenter(this.state.center);
    this.map2.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.map2.setTarget("map");

    // Listen to map changes
    this.map2.on("moveend", () => {
      let center = this.map2.getView().getCenter();
      let zoom = this.map2.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.map2.getView().getCenter();
    let zoom = this.map2.getView().getZoom();
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
          <Menu 
            key="card" 
            isHidden={this.state.menuIsHidden}
            defaultYear={this.state.defaultYear}
            defaultCode={this.state.defaultCode}
            handleYears={this.handleYears}
            handleCodes={this.handleCodes}
            defaultCategory="Bacia hidrográfica"
            onOffLandsat={this.onOffLandsat} 
            onOffLanduse={this.onOffLanduse}
            map={this.map2}
          />

          <Scalebar 
            key="scalebar"
            map={this.map2}
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
            map={this.map2}
            projection='EPSG:4326'
          />
        </MapContainer>
    );
  }
}

export default WatershedsMap;