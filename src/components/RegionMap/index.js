import React, { useState, useEffect } from "react";
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

const RegionMap = (props) => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCategory, setCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [center, setCenter] = useState([-45.25811, -12.652125]);
  const [zoom, setZoom] = useState(8);
  const [layers, setLayer] = useState([]);

  useEffect(() => {
      setCenter([-45.56258, -20.125457]);
      setZoom(5);

      map.getView().setCenter(center);
      map.getView().setZoom(zoom);

      map.setTarget("map");
      // Listen to map changes
      map.on("moveend", () => {
        let center = map.getView().getCenter();
        let zoom = map.getView().getZoom();

        setYear(props.defaultYear);
        setCategory(props.defaultCategory);
        setCenter(center);
        setZoom(zoom);
      });
  }, []);

  const landsat = new TileLayer({
    visible: false,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatRegion.map',
      params: {
        'year': defaultYear,
        'LAYERS': 'Landsat',
      },
      serverType: 'mapserver'
    })
  });

  const landuse = new TileLayer({
    visible: true,
    source: new TileWMS({
      url: 'http://corrente.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map',
      params: {
        'year': defaultYear,
        'LAYERS': 'Landuse',
      },
      serverType: 'mapserver'
    })
  });

  const view = new View({
    projection: 'EPSG:4326',
    center: center,
    zoom: zoom
  });

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, landsat, landuse],
    view: view
  });

  const onOffLandsat = (evt) => {
    landsat.setVisible(evt);
  }

  const onOffLanduse = (evt) => {
    landuse.setVisible(evt);
  }

  const handleYears = year => {
    /*
      Change the map year and update the map layer
    */
    setYear(year);

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

    landuse.setSource(new_landuse);
    landuse.getSource().updateParams({ "time": Date.now() });
    landuse.changed();

    landsat.setSource(new_landsat);
    landsat.getSource().updateParams({ "time": Date.now() });
    landsat.changed();
  }

  return (
        <MapContainer id="map">
          <Menu 
            key="menu" 
            isHidden={menuIsHidden}
            defaultYear={defaultYear} 
            handleYears={handleYears} 
            defaultCategory="Região" 
            onOffLandsat={onOffLandsat} 
            onOffLanduse={onOffLanduse}
            map={map}
          />

          <Scalebar 
            key="scalebar"
            map={map}
          />

          <div id="plots" className="plot-card">
            <Stackplot 
              key="stackplot"
            />
            
            <Barplot 
              key={"barplot"+ defaultYear}
              defaultYear={defaultYear}
            />

          </div>

          <Footer 
            key="footer"
            map={map}
            projection='EPSG:4326'
          />
        </MapContainer>
    );
}

export default RegionMap;