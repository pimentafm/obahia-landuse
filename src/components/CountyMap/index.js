import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";

import oba from "~/services/api";

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "~/components/Menu";
import Scalebar from "~/components/Scalebar";
import Footer from "~/components/Footer";


import Cardplot from "~/components/Cardplot";
import Stackplot from "~/components/StackplotCounty";
import Barplot from "~/components/BarplotCounty";

const CountyMap = props => {
  const [defaultYear, setYear] = useState(props.defaultYear);
  const [defaultCodeName, setCode] = useState(props.defaultCodeName);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [plotsAreHidden] = useState(false);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [landuse] = useState(new TileLayer());
  const [landsat] = useState(new TileLayer({ visible: false }));

  const landuse_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseCounties.map",
    params: {
      year: defaultYear,
      code: defaultCodeName.code,
      LAYERS: "landuse"
    },
    serverType: "mapserver"
  });

  const landsat_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landsatCounties.map",
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

  const handleCodeNames = codename => {
    const code = codename.split(" - ")[1];

    setCode({code: parseInt(code), name: codename});

    oba
      .post("geom/", {
        table_name: "counties",
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
        handleCodeNames={handleCodeNames}
        defaultCodeName={defaultCodeName.name}
        defaultCategory={defaultCategory}
        onOffLandsat={onOffLandsat}
        onOffLanduse={onOffLanduse}
        map={map}
      />

      <Scalebar key="scalebar" map={map} />

      <Cardplot plotsAreHidden={plotsAreHidden}
        stackplot={
          <Stackplot
            key="stackplot"
            defaultCodeName={defaultCodeName}
            defaultYear={defaultYear}
          />
        }
        barplot={
          <Barplot
            key={"barplot" + defaultYear}
            defaultCodeName={defaultCodeName}
            defaultYear={defaultYear}
          />
        }
      />

      <Footer key="footer" map={map} />
    </MapContainer>
  );
};

export default CountyMap;
