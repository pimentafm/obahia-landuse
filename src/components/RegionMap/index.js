import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import { defaults } from 'ol/interaction';

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

import domtoimage from 'dom-to-image';

const RegionMap = props => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [plotsAreHidden] = useState(false);
  const [reportIsHidden, setReportHidden] = useState(true);
  const [center] = useState([-45.25811, -12.652125]);
  const [zoom] = useState(8);
  const [landuse] = useState(new TileLayer());
  const [landsat] = useState(new TileLayer({ visible: false }));
  const [stackImage, setStackImage] = useState("/obahia-webmap/src/assets/images/image-loading.png");
  const [barImage, setBarImage] = useState("/obahia-webmap/src/assets/images/image-loading.png");

  const landuse_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map",
    params: {
      year: defaultYear,
      LAYERS: "landuse"
    },
    serverType: "mapserver"
  });

  const landsat_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatRegion.map",
    params: {
      year: defaultYear,
      LAYERS: "landsat"
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

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, landsat, landuse],
    view: view,
    interactions: defaults({
      keyboard: false
    })
  });

  useEffect(() => {
    map.setTarget("map");
  });

  const onOffLandsat = evt => {
    landsat.setVisible(evt);
  };

  const onOffLanduse = evt => {
    landuse.setVisible(evt);
  };

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
        onOffLandsat={onOffLandsat}
        onOffLanduse={onOffLanduse}
        map={map}
      />

      <Scalebar key="scalebar" map={map} />
      
      <CardPlot plotsAreHidden={plotsAreHidden}
        stackplot={<Stackplot key={"stackplot" + defaultYear} id="stackplot" />}
        barplot={<Barplot key={"barplot" + defaultYear} defaultYear={defaultYear} />}
      />

      <Footer key="footer" map={map} />

      <CardReport reportIsHidden={reportIsHidden}
        report={
          <Report 
            key="report" 
            params={{
              defaultYear, 
              defaultCategory,
              stackImage,
              barImage
            }}
          />
        }
      />

    </MapContainer>
  );
};

export default RegionMap;
