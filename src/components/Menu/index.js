import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Select, Icon } from "antd";

import oba from "~/services/api";

import { MenuContainer } from "./styles";
import LayerSwitcher from "~/components/LayerSwitcher";
import Zoom from "~/components/Zoom";

import "antd/dist/antd.css";

const { Option } = Select;

const Menu = props => {
  const [defaultYear] = useState(props.defaultYear);
  const [defaultWatershed] = useState(props.defaultWatershed);
  const [defaultCodeName] = useState(props.defaultCodeName);
  const [defaultCategory, setCategory] = useState(props.defaultCategory);
  const [categories] = useState([
    ["Região", "/"],
    ["Bacia hidrográfica", "watershed"],
    ["Área de drenagem", "drainage"],
    ["Municípios", "county"]
  ]);
  const [years] = useState(
    Array.from(new Array(29), (val, index) => index + 1990)
  );
  const [watersheds] = useState(["grande", "corrente", "carinhanha"]);
  const [codenames, setCodenames] = useState([]);
  const [isHidden, setHidden] = useState(props.isHidden);
  const [map] = useState(props.map);

  useEffect(() => {
    oba.post("geom/", {
      table_name: (props.defaultCategory === "Municípios") ? "counties" : "drainage",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      const data = response.data.map(({ name, code }) => ({ name, code }));
      
      const names = data.map(n => n.name);
      const codes = data.map(n => n.code);

      const codenames = names.map((n, c) => n + ' - '+ codes[c]);

      setCodenames(codenames);
    })
    .catch(e => {
      this.errors.push(e);
    });
  },[props.defaultCategory]);

  const handleCategory = e => {
    setCategory(e);

    toast.info("Análise por " + e, {
      autoClose: 3000,
      className: "toast",
      position: toast.POSITION.TOP_CENTER
    });
  };

  const handleMenu = () => {
    if (isHidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  let watershedsLabel = null;
  let watershedSelect = null;

  if (defaultCategory === "Bacia hidrográfica") {
    watershedsLabel = <label>Nome</label>;
    watershedSelect = (
      <Select
        id="select"
        defaultValue={defaultWatershed}
        onChange={props.handleWatersheds}
        style={{ color: "#000" }}
      >
        {watersheds.map(c => (
          <Option key={c} value={c} style={{ color: "#000" }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    watershedSelect = null;
  }

  let drainageLabel = null;
  let drainageSelect = null;

  if (defaultCategory === "Área de drenagem" || defaultCategory === "Municípios") {
    drainageLabel = <label>Nome</label>;
    drainageSelect = (
      <Select
        id="select"
        defaultValue={defaultCodeName}
        onChange={props.handleCodeNames}
      >
        {codenames.map(c => (
          <Option key={c} value={c} style={{ color: "#000" }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    drainageSelect = null;
  }

  return (
    <MenuContainer isHidden={isHidden}>

      <div id="nav" className="nav">  
        <Icon
          id="handleMenu"
          type="menu"
          className="nav_icon"
          style={{ fontSize: "20px" }}
          onClick={() => handleMenu()}
        />
        <button id="report-button"
          title="Gera relatório"
          onClick={props.handleReport}
          >Relatorio
        </button>
      </div>

      <hr></hr>

      <Zoom key="zoom" isHidden={props.menuIsHidden} map={map} />

      <label>Categoria</label>
      <Select
        id="select"
        defaultValue={defaultCategory}
        onChange={handleCategory}
      >
        {categories.map(c => (
          <Option key={c[0]} value={c[0]}>
            <Link to={c[1]} style={{ color: "#000" }}>{c[0]}</Link>
          </Option>
        ))}
      </Select>

      {watershedsLabel}
      {watershedSelect}

      {drainageLabel}
      {drainageSelect}

      <label>Ano</label>
      <Select
        id="select"
        defaultValue={defaultYear}
        onChange={props.handleYears}
        style={{ color: "#000" }}
      >
        {years.map(y => (
          <Option key={y} value={y} style={{ color: "#000" }}>
            {y}
          </Option>
        ))}
      </Select>

      <LayerSwitcher
        name="Uso do Solo"
        checked={true}
        legend={true}
        switcher={() => props.onOffLanduse}
      />
      <LayerSwitcher
        name="Imagens de Satélite (Landsat)"
        checked={false}
        legend={false}
        switcher={() => props.onOffLandsat}
      />

    </MenuContainer>
  );
};

export default Menu;
