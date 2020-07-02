import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { oba } from '../../services';

import { Tooltip } from 'antd';

import OlMap from 'ol/Map';

import { Select } from 'antd';
import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';

import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

interface CodeNameData {
  code: number;
  name: string;
}

interface MenuProps {
  ishidden: number;
  defaultCategory: string;
  defaultCodeName?: CodeNameData;
  defaultWatershed?: string;
  defaultYear: number;
  handleWatershed?(year: string): void;
  handleCodeName?(codename: string): void;
  handleYear(year: number): void;
  map: OlMap;
}

const { Option } = Select;

const Menu: React.FC<MenuProps> = ({
  ishidden,
  defaultCategory,
  defaultCodeName,
  defaultWatershed,
  defaultYear,
  handleCodeName,
  handleWatershed,
  handleYear,
  map,
  ...rest
}) => {
  const [hidden, setHidden] = useState(ishidden);
  const history = useHistory();
  const [category, setCategory] = useState(defaultCategory);

  const [codenames, setCodenames] = useState([]);
  const [watersheds] = useState(['grande', 'corrente', 'carinhanha']);

  const [categories] = useState([
    ['Regional', 'region'],
    ['Bacia hidrográfica', 'gcc'],
    ['Área de drenagem', 'drainage'],
    ['Municipal', 'counties'],
  ]);

  const [years] = useState(
    Array.from(new Array(29), (val, index) => index + 1990),
  );

  const handleMenu = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  const handleCategory = useCallback(
    e => {
      setCategory(e);
      history.push(e);
    },
    [history],
  );

  const handleLayerVisibility = useCallback(
    (e, id) => {
      const lyr_name = id; //obj.target.name;

      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setVisible(e);
        }
      });
    },
    [map],
  );

  let watershedsLabel = null;
  let watershedSelect = null;

  if (defaultCategory === 'Bacia hidrográfica') {
    watershedsLabel = <label>Nome</label>;
    watershedSelect = (
      <Select
        id="select"
        defaultValue={defaultWatershed}
        onChange={handleWatershed}
        style={{ color: '#000' }}
      >
        {watersheds.map(c => (
          <Option key={c} value={c} style={{ color: '#000' }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    watershedSelect = null;
  }

  let codeNameLabel = null;
  let codeNameSelect = null;

  if (
    defaultCategory === 'Área de drenagem' ||
    defaultCategory === 'Municipal'
  ) {
    oba
      .post('geom/', {
        table_name: defaultCategory === 'Municipal' ? 'counties' : 'drainage',
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        const data = response.data;

        const names = data.map((n: CodeNameData) => n.name);
        const codes = data.map((c: CodeNameData) => c.code);

        const codenames = names.map(
          (n: string, c: number) => n + ' - ' + codes[c],
        );

        setCodenames(codenames);
      })
      .catch(e => {
        throw new Error('Do not load codenames');
      });

    codeNameLabel = <label>Nome</label>;
    codeNameSelect = (
      <Select
        id="select"
        defaultValue={defaultCodeName?.name}
        onChange={handleCodeName}
      >
        {codenames.map(c => (
          <Option key={c} value={c} style={{ color: '#000' }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    codeNameSelect = null;
  }

  useEffect(() => {}, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ZoomControl ishidden={hidden} map={map} />
      <Scalebar id="scalebar" map={map} />

      <Header ishidden={hidden}>
        <a href="http://obahia.dea.ufv.br">
          <img
            src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
            alt="Obahia"
          />
        </a>

        <Tooltip placement="right" title="Esconde/Mostra menu">
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Tooltip>
      </Header>

      <Content>
        <label>Nível</label>
        <Select
          id="select-category"
          defaultValue={category}
          onChange={handleCategory}
        >
          {categories.map(c => (
            <Option key={c[1]} value={c[1]}>
              {c[0]}
            </Option>
          ))}
        </Select>

        {watershedsLabel}
        {watershedSelect}

        {codeNameLabel}
        {codeNameSelect}

        <label>Ano</label>
        <Select
          id="select-year"
          defaultValue={defaultYear}
          onChange={handleYear}
          style={{ color: '#000' }}
        >
          {years.map(y => (
            <Option key={y} value={y} style={{ color: '#000' }}>
              {y}
            </Option>
          ))}
        </Select>

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label="Hidrografia"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label="Rodovias"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#FABE57"
          />
        </div>

        <LayerSwitcher
          name="landuse"
          label="Uso do solo"
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={true}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
        />
      </Content>

      <Footer ishidden={hidden}>
        <Tooltip placement="right" title="Sobre">
          <FaInfoCircle
            id="about"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={() =>
              window.open(`http://obahia.dea.ufv.br/about/`, '_blank')
            }
          />
        </Tooltip>
      </Footer>
    </Container>
  );
};

export default Menu;
