import React, { useState, useEffect, useCallback } from 'react';

import OlMap from 'ol/Map';

import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';

import { defaults } from 'ol/interaction';

import 'ol/ol.css';

import { oba, wms } from '../../services';

import { Container } from './styles';

import Menu from '../Menu';
import Footer from '../Footer';

import CardPlot from '../CardPlotWatershed';

import Popup from '../../components/Popup';

interface MapProps {
  defaultYear: number;
  defaultCategory: string;
  defaultWatershed: string;
}

interface WatershedsData {
  name: string;
  centroid: Object;
}

const Map: React.FC<MapProps> = ({
  defaultYear,
  defaultCategory,
  defaultWatershed,
}) => {
  const [landuse] = useState(new TileLayer({ visible: true }));
  const [year, setYear] = useState(defaultYear);
  const [watershed, setWatershed] = useState(defaultWatershed);

  const [center, setCenter] = useState([-45.2471, -12.4818]);
  const [zoom, setZoom] = useState(7);

  const [view] = useState(
    new View({
      projection: 'EPSG:4326',
      center: center,
      extent: [-56.0, -20.0, -33.0, -6.0],
      zoom: zoom,
    }),
  );

  const osm = new TileLayer({ source: new OSM() });

  const [map] = useState(
    new OlMap({
      controls: [],
      target: undefined,
      layers: [osm, landuse],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const landuse_source = new TileWMS({
    url: wms.defaults.baseURL + 'landuseWatersheds.map',
    params: {
      year: year,
      ws: watershed,
      LAYERS: 'landuse',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  landuse.set('name', 'landuse');
  landuse.setSource(landuse_source);
  landuse.getSource().refresh();

  const handleYear = useCallback(
    y => {
      setYear(y);
    },
    [setYear],
  );

  const handleWatershed = useCallback(
    ws => {
      setWatershed(ws);

      oba
        .post('geom/', {
          table_name: 'gcc',
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(response => {
          let cxcy = response.data
            .filter((f: WatershedsData) => f.name === ws.toUpperCase())
            .map((c: WatershedsData) => c.centroid);

          cxcy = JSON.parse(cxcy);

          setCenter(cxcy);
          setZoom(8);

          map.getView().animate({ center: cxcy, duration: 1000 });
        })
        .catch(e => {
          throw new Error('Do not load watersheds data');
        });
    },
    [map],
  );

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu
        ishidden={false ? 1 : 0}
        defaultCategory={defaultCategory}
        defaultWatershed={defaultWatershed}
        handleWatershed={handleWatershed}
        defaultYear={year}
        handleYear={handleYear}
        map={map}
      />

      <Popup map={map} source={landuse_source} />

      <CardPlot year={year} watershed={watershed} />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
