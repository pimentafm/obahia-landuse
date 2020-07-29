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
  const [highways] = useState(new TileLayer({ visible: false }));
  const [hidrography] = useState(new TileLayer({ visible: false }));

  const [watershed, setWatershed] = useState(defaultWatershed);
  const [year, setYear] = useState(defaultYear);

  const [center, setCenter] = useState([-45.2471, -12.4818]);
  const [zoom, setZoom] = useState<number>(7);

  const [view] = useState(
    new View({
      projection: 'EPSG:4326',
      maxZoom: 12,
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
      layers: [osm, landuse, highways, hidrography],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const highways_source = new TileWMS({
    url: wms.defaults.baseURL + 'highwaysWatersheds.map',
    params: {
      LAYERS: 'Rodovias',
      ws: watershed.toLowerCase(),
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const hidrography_source = new TileWMS({
    url: wms.defaults.baseURL + 'hidrographyWatersheds.map',
    params: {
      ws: watershed.toLowerCase(),
      LAYERS: 'hidrografia',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const landuse_source = new TileWMS({
    url: wms.defaults.baseURL + 'landuseWatersheds.map',
    params: {
      year: year,
      ws: watershed.toLowerCase(),
      LAYERS: 'landuse',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  highways.set('name', 'highways');
  highways.setSource(highways_source);
  highways.getSource().refresh();

  hidrography.set('name', 'hidrography');
  hidrography.setSource(hidrography_source);
  hidrography.getSource().refresh();

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
      setWatershed(ws.toLowerCase());

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
          setZoom(7);

          map.getView().animate({ center: cxcy, duration: 1000, zoom });
        })
        .catch(e => {
          throw new Error('Do not load watersheds data');
        });
    },
    [map, zoom],
  );

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu
        ishidden={false ? 1 : 0}
        defaultCategory={defaultCategory}
        defaultWatershed={watershed}
        handleWatershed={handleWatershed}
        defaultYear={year}
        handleYear={handleYear}
        map={map}
      />

      <Popup map={map} source={landuse_source} />

      <CardPlot year={year} watershed={watershed.toLowerCase()} />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
