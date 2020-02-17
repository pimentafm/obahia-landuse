import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";

import oba from "../../services/api";

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "../../components/Menu";
import Scalebar from "../../components/Scalebar";
import Footer from "../../components/Footer";

import Stackplot from "../../components/StackplotDrainage";
//import Barplot from "../../components/BarplotDrainage";

const DrainageMap = props => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCodeName, setCode] = useState(props.defaultCodeName);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [landuse] = useState(new TileLayer());
  const [landsat] = useState(new TileLayer({ visible: false }));

  const landuse_source = new TileWMS({
    url:
      "http://localhost/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseDrainage.map",
    params: {
      year: defaultYear,
      code: defaultCodeName.code,
      LAYERS: "landuse"
    },
    serverType: "mapserver"
  });

  const landsat_source = new TileWMS({
    url:
      "http://localhost/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatDrainage.map",
    params: {
      year: defaultYear,
      code: defaultCodeName.code,
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
    view: view
  });

  useEffect(() => {
    map.getView().setCenter(props.center);
    map.getView().setZoom(props.zoom);
    map.setTarget("map");
  }, [props.center, props.zoom, map]);

  const onOffLandsat = evt => {
    landsat.setVisible(evt);
  };

  const onOffLanduse = evt => {
    landuse.setVisible(evt);
  };

  const handleYears = year => {
    setYear(year);
  };

  const handleDrainage = code => {
    const c = code.match(/\d+/g).map(Number);

    setCode({code: c[0]});

    oba
      .post("geom/", {
        table_name: "drainageareas",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        const cxcy = response.data
          .filter(f => f.name === defaultCodeName.name)
          .map(c => c.centroid);
        const extent = response.data
          .filter(f => f.name === defaultCodeName.name)
          .map(c => c.extent);

        setCenter(cxcy[0]);
        setZoom(extent[0]);
      })
      .catch(e => {
        this.errors.push(e);
      });
  };

  return (
    <MapContainer id="map">
      <Menu
        key="menu"
        isHidden={menuIsHidden}
        defaultYear={defaultYear}
        handleYears={handleYears}
        handleDrainage={handleDrainage}
        defaultCodeName={defaultCodeName.name}
        defaultCategory={defaultCategory}
        onOffLandsat={onOffLandsat}
        onOffLanduse={onOffLanduse}
        map={map}
      />

      <Scalebar key="scalebar" map={map} />
      <div id="plots" className="plot-card">
        <Stackplot
          key="stackplot"
          defaultCodeName={defaultCodeName}
          defaultYear={defaultYear}
        />
        {/*
        <Barplot
          key={"barplot" + defaultYear}
          defaultWatershed={defaultWatershed}
          defaultYear={defaultYear}
        />
        */}
      </div>

      <Footer key="footer" map={map} />
    </MapContainer>
  );
};

export default DrainageMap;
