import React, { useState, useEffect, useCallback } from 'react';

import OlMap from 'ol/Map';

import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';

import { defaults } from 'ol/interaction';

import 'ol/ol.css';

import { wms } from '../../services';

import { Container } from './styles';

import Menu from '../Menu';
import Footer from '../Footer';
import Scalebar from '../ScaleBar';

import CardPlot from '../CardPlot';

import Popup from '../../components/Popup';

interface MapProps {
  defaultYear: number;
  defaultCategory: string;
}

const Map: React.FC<MapProps> = ({ defaultYear, defaultCategory }) => {
  const [landuse] = useState(new TileLayer());
  const [year, setYear] = useState(defaultYear);

  const [center] = useState([-45.2471, -12.4818]);
  const [zoom] = useState(7);

  const [view] = useState(
    new View({
      projection: 'EPSG:4326',
      center: center,
      extent: [-56.0, -20.0, -33.0, -6.0],
      zoom: zoom,
    }),
  );

  const landuse_source = new TileWMS({
    url: wms.defaults.baseURL + 'landuseRegion.map',
    params: {
      year: year,
      LAYERS: 'landuse',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  landuse.setSource(landuse_source);
  landuse.getSource().refresh();

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: undefined,
    layers: [osm, landuse],
    view: view,
    interactions: defaults({
      keyboard: false,
    }),
  });

  const handleYear = useCallback(
    y => {
      setYear(y);
    },
    [setYear],
  );

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu
        ishidden={false ? 1 : 0}
        defaultCategory="Region"
        defaultYear={year}
        handleYear={handleYear}
        map={map}
      />

      <Popup map={map} source={landuse_source} />

      <CardPlot />

      <Footer id="footer" map={map} />

      <Scalebar id="scalebar" map={map} />
    </Container>
  );
};

export default Map;
