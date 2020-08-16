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

import CardPlot from '../CardPlotDrainage';

import Popup from '../../components/Popup';

interface DrainageData {
  code: number;
  name: string;
  centroid?: Object;
}

interface MapProps {
  defaultYear: number;
  defaultCategory: string;
  defaultCodeName: DrainageData;
}

const Map: React.FC<MapProps> = ({
  defaultYear,
  defaultCategory,
  defaultCodeName,
}) => {
  const [landuse] = useState(
    new TileLayer({ visible: true, className: 'landuse-layer' }),
  );
  const [highways] = useState(new TileLayer({ visible: false }));
  const [hidrography] = useState(new TileLayer({ visible: false }));
  const [flowStations] = useState(new TileLayer({ visible: true }));

  const [codeName, setCodeName] = useState<DrainageData>(defaultCodeName);
  const [year, setYear] = useState(defaultYear);

  const [center, setCenter] = useState([-45.2581, -12.6521]);
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

  const osm = new TileLayer({ source: new OSM({ crossOrigin: 'anonymous' }) });

  const [map] = useState(
    new OlMap({
      controls: [],
      target: undefined,
      layers: [osm, landuse, highways, hidrography, flowStations],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const highways_source = new TileWMS({
    url: wms.defaults.baseURL + 'highwaysDrainage.map',
    params: {
      code: codeName.code,
      LAYERS: 'Rodovias',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const hidrography_source = new TileWMS({
    url: wms.defaults.baseURL + 'hidrographyDrainage.map',
    params: {
      code: codeName.code,
      LAYERS: 'hidrografia',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const flowStations_source = new TileWMS({
    url: wms.defaults.baseURL + 'estacoesFluviometricas.map',
    params: {
      code: codeName.code,
      LAYERS: 'estacoes',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const landuse_source = new TileWMS({
    url: wms.defaults.baseURL + 'landuseDrainage.map',
    params: {
      year: year,
      code: codeName.code,
      LAYERS: 'landuse',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  highways.set('name', 'highways');
  highways.setSource(highways_source);
  highways.getSource().refresh();

  hidrography.set('name', 'hidrography');
  hidrography.setSource(hidrography_source);
  hidrography.getSource().refresh();

  flowStations.set('name', 'estacoes');
  flowStations.setSource(flowStations_source);
  flowStations.getSource().refresh();

  landuse.set('name', 'landuse');
  landuse.setSource(landuse_source);
  landuse.getSource().refresh();

  const handleYear = useCallback(
    y => {
      setYear(y);
    },
    [setYear],
  );

  const handleCodeName = useCallback(
    codename => {
      const code = parseInt(codename.split(' - ')[1]);

      setCodeName({ code: code, name: codename });

      oba
        .post('geom/', {
          table_name: 'drainage',
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(response => {
          let cxcy = response.data
            .filter((f: DrainageData) => f.code === code)
            .map((c: DrainageData) => c.centroid);

          cxcy = JSON.parse(cxcy);

          setCenter(cxcy);
          setZoom(7);

          map.getView().animate({ center: cxcy, duration: 1000, zoom });
        })
        .catch(e => {
          throw new Error('Do not load drainage data');
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
        ishidden={window.innerWidth <= 760 ? 1 : 0}
        defaultCategory={defaultCategory}
        defaultCodeName={defaultCodeName}
        handleCodeName={handleCodeName}
        defaultYear={year}
        handleYear={handleYear}
        map={map}
      />

      <Popup map={map} source={landuse_source} />

      <CardPlot
        year={year}
        code={codeName.code}
        ishidden={window.innerWidth <= 760 ? 1 : 0}
      />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
