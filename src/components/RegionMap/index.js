import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import Graticule from 'ol/layer/Graticule';
import Stroke from 'ol/style/Stroke';
import { defaults } from 'ol/interaction';
import {createStringXY} from 'ol/coordinate';

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "~/components/Menu";
import Scalebar from "~/components/Scalebar";
import Footer from "~/components/Footer";

import CardPlot from "~/components/CardPlot";
import Stackplot from "~/components/Stackplot/StackplotRegion";
import Barplot from "~/components/Barplot/BarplotRegion";

import CardReport from "~/components/CardReport";
import Report from "~/components/Report";

import Popup from "~/components/popup";

import domtoimage from 'dom-to-image';

const RegionMap = props => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [plotsAreHidden] = useState(false);
  const [reportIsHidden, setReportHidden] = useState(true);
  const [center] = useState([-45.25811, -12.652125]);
  const [zoom] = useState(8);
  const [landuse] = useState(new TileLayer({ name: "landuse", visible: true }));
  const [landsat] = useState(new TileLayer({ name: "landsat", visible: false }));
  const [stackImage, setStackImage] = useState("http://obahia.dea.ufv.br/static/geonode/img/loading.png");
  const [barImage, setBarImage] = useState("http://obahia.dea.ufv.br/static/geonode/img/loading.png"); 

  const base_URL = "http://obahia.dea.ufv.br:8085/";

  const landuse_source = new TileWMS({
    url: base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/landuseRegion.map",
      //hover: true,
      //pixelTolerance: 80,
    params: {
      year: defaultYear,
      LAYERS: "landuse",
      TILED: true
    },
    serverType: "mapserver"
  });

  const landsat_source = new TileWMS({
    url: base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/landsatRegion.map",
    params: {
      year: defaultYear,
      LAYERS: "landsat",
      TILED: true
    },
    serverType: "mapserver"
  });

  landsat.setSource(landsat_source);
  landsat.getSource().updateParams({ time: Date.now() });
  landsat.changed();
  landuse.setSource(landuse_source);
  landuse.getSource().updateParams({ time: Date.now() });
  landuse.changed();

  const view = new View({
    projection: "EPSG:4326",
    center: center,
    zoom: zoom
  });

  const graticule =  new Graticule({
    name: 'graticule',
    visible: false,
    className: 'graticule-layer',
    strokeStyle: new Stroke({
      color: 'rgba(120,120,120,0.9)',
      width: 2,
      lineDash: [0.5, 10]
    }),
    showLabels: true,
    lonLabelPosition: 0.065,
    latLabelPosition: 0.999,
    wrapX: false
  });

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, landsat, landuse, graticule],
    view: view,
    interactions: defaults({
      keyboard: false
    })
  });

  useEffect(() => {
    map.setTarget("map");
  });

  const handleYears = year => {
    setYear(year);
  };

  const handleReport = () => {
    domtoimage.toPng(document.getElementById('stack-plot'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        setStackImage(img.src);
    })
    .catch(function (error) {
        console.error('oops, something went wrong when generate StackPlot image!', error);
    });

    domtoimage.toPng(document.getElementById('bar-plot'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        setBarImage(img.src);
    })
    .catch(function (error) {
        console.error('oops, something went wrong when generate BarPlot image!', error);
    });

    if (reportIsHidden === false) {
      setReportHidden(true);
    } else {
      setReportHidden(false);
    }
  };

  const onOffLayers = (evt, obj) => {
    const lyr_name = obj.target.name;
    map.getLayers().forEach(lyr => {
      if (lyr.get('name') === lyr_name) {
        lyr.setVisible(!lyr.get('visible'));
      }
    });
  };

  map.on('singleclick', evt => {

    let coords = evt.coordinate;
    let res = view.getResolution();
    let proj = view.getProjection();

    let url = landuse.getSource().getFeatureInfoUrl(
      coords, res, proj,
      {
        INFO_FORMAT: 'text/html',
        VERSION: '1.3.0'
      });
      
    if (url) {
      fetch(url)
        .then(response => { return response.text(); })
        .then(html => {
          const stringifyFunc = createStringXY(5);

          const luclass = document.getElementById('popup-class');
          const pcoords = document.getElementById('popup-coords');
          const value = document.getElementById('popup-value');

          const luclasses = {
            '1.0': 'Formações florestais',
            '2.0': 'Formações savânicas',
            '3.0': 'Formações campestres',
            '4.0': 'Mosaico de agricultura ou pastagem',
            '5.0': 'Agricultura de sequeiro',
            '6.0': 'Agricultura irrigada',
            '7.0': 'Pastagem',
            '8.0': `Corpos d'água`,
            '9.0': 'Área urbana/Construções rurais'
          };

          luclass.innerHTML = luclasses[html] ? luclasses[html] : "NaN";
          pcoords.innerHTML = stringifyFunc(coords);
          value.innerHTML = html ? html : "NaN";
        });
    }
  });

  return (
    <MapContainer id="map">
      <Menu
        key="menu"
        isHidden={menuIsHidden}
        reportIsHidden={reportIsHidden}
        handleReport={handleReport}
        defaultYear={defaultYear}
        handleYears={handleYears}
        defaultCategory={defaultCategory}
        onOffLayers={onOffLayers}
        map={map}
      />

      <Popup />

      <Scalebar key="scalebar" map={map} />
      
      <CardPlot plotsAreHidden={plotsAreHidden}
        stackplot={<Stackplot key={"stackplot" + defaultYear} id="stackplot" />}
        barplot={<Barplot key={"barplot" + defaultYear} defaultYear={defaultYear} />}
      />

      <Footer key="footer" map={map} />

      <CardReport id="card-report" reportIsHidden={reportIsHidden}
        report={
          <Report 
            key="report" 
            params={{
              defaultYear, 
              defaultCategory,
              stackImage,
              barImage
            }}

            map={map}
          />
        }
      />

    </MapContainer>
  );
};

export default RegionMap;
