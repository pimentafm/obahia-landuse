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
  const [landuse] = useState(new TileLayer({ visible: true }));
  const [year, setYear] = useState(defaultYear);
  const [codeName, setCodeName] = useState<DrainageData>(defaultCodeName);

  const [center, setCenter] = useState([-45.2581, -12.6521]);
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
    url: wms.defaults.baseURL + 'landuseDrainage.map',
    params: {
      year: year,
      code: codeName.code,
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
        .then(async response => {
          let cxcy = await response.data
            .filter((f: DrainageData) => f.code === code)
            .map((c: DrainageData) => c.centroid);

          cxcy = JSON.parse(cxcy);

          setCenter(cxcy);
          setZoom(8);

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
        ishidden={false ? 1 : 0}
        defaultCategory={defaultCategory}
        defaultCodeName={defaultCodeName}
        handleCodeName={handleCodeName}
        defaultYear={year}
        handleYear={handleYear}
        map={map}
      />

      <Popup map={map} source={landuse_source} />

      <CardPlot year={year} code={codeName.code} />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
