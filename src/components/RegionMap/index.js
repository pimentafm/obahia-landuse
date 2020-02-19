import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "../../components/Menu";
import Scalebar from "../../components/Scalebar";
import Footer from "../../components/Footer";

import Cardplot from "../../components/Cardplot";
import Stackplot from "../../components/Stackplot";
import Barplot from "../../components/Barplot";

const RegionMap = props => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [plotsAreHidden] = useState(false);
  const [center] = useState([-45.25811, -12.652125]);
  const [zoom] = useState(8);
  const [landuse] = useState(new TileLayer());
  const [landsat] = useState(new TileLayer({ visible: false }));


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

  useEffect(() => {
    map.getView().setCenter(center);
    map.getView().setZoom(zoom);
    map.setTarget("map");
  });

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
    view: view
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

  return (
    <MapContainer id="map">
      <Menu
        key="menu"
        isHidden={menuIsHidden}
        defaultYear={defaultYear}
        handleYears={handleYears}
        defaultCategory={defaultCategory}
        onOffLandsat={onOffLandsat}
        onOffLanduse={onOffLanduse}
        map={map}
      />

      <Scalebar key="scalebar" map={map} />
      
      <Cardplot plotsAreHidden={plotsAreHidden}
        stackplot={<Stackplot key="stackplot" />}
        barplot={<Barplot key={"barplot" + defaultYear} defaultYear={defaultYear} />}
      />

      <Footer key="footer" map={map} />
    </MapContainer>
  );
};

export default RegionMap;
