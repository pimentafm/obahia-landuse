import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Tooltip } from 'antd';

import OlMap from 'ol/Map';

import { Select } from 'antd';
import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';

import ZoomControl from './ZoomControl';

import LayerSwitcher from '../LayerSwitcher';

import { Container } from './styles';

interface MenuProps {
  ishidden: number;
  defaultCategory: string;
  defaultYear: number;
  handleYear(year: number): void;
  map: OlMap;
}

const { Option } = Select;

const Menu: React.FC<MenuProps> = ({
  ishidden,
  defaultCategory,
  defaultYear,
  handleYear,
  map,
  ...rest
}) => {
  const [hidden, setHidden] = useState(ishidden);
  const history = useHistory();
  const [category, setCategory] = useState(defaultCategory);

  const [categories] = useState([
    ['Região', '/'],
    ['Bacia hidrográfica', 'watershed'],
    ['Área de drenagem', 'drainage'],
    ['Municípios', 'county'],
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

  const handleLayerVisibility = useCallback((evt) => {
    const lyr_name = 'landuse'; //obj.target.name;

      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setVisible(evt);
        }
      });
    },
    [map],
  );

  useEffect(() => {}, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ZoomControl ishidden={hidden} map={map} />

      <div id="nav" className="nav">
        <Tooltip placement="right" title="Esconde/Mostra menu">
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Tooltip>
      </div>

      <label>Categoria</label>
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

      <LayerSwitcher name="landuse" label="Uso do solo" handleLayerVisibility={handleLayerVisibility} />
    </Container>
  );
};

export default Menu;
