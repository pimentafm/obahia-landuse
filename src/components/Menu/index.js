import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Select, Icon} from 'antd';

import { MenuContainer } from './styles';
import LayerSwitcher from '../../components/LayerSwitcher';
import Zoom from '../Zoom';

import "antd/dist/antd.css";

const { Option } = Select;

const Menu = (props) => {
  const [defaultYear] = useState(props.defaultYear);
  const [defaultCode] = useState(props.defaultCode);
  const [defaultCategory, setCategory] = useState(props.defaultCategory);
  const [categories] = useState([['Região', '/'],['Bacia hidrográfica', 'watersheds']]);
  const [years] = useState(Array.from(new Array(29),(val,index) => index+1990));
  const [codes] = useState([76424, 76452, 76447, 76284, 76219]);
  const [isHidden, setHidden] = useState(props.isHidden);
  const [map] = useState(props.map);

  const handleCategory = e => {
    setCategory(e);

    toast.info('Análise por ' + e, {
      autoClose: 3000,
      className: 'toast',
      position: toast.POSITION.TOP_CENTER
    })
  }

  const handleMenu = () => {
    if(isHidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }

  let watershedsLabel = null;
  let watershedSelect = null;

  if (defaultCategory === 'Bacia hidrográfica') {
    watershedsLabel = <label>Código da bacia</label>
    watershedSelect = <Select id="select" defaultValue={defaultCode} onChange={props.handleCodes}>
                        {codes.map(c => <Option key={c} value={c}>{c}</Option>)}
                      </Select>
  } else {
    watershedSelect = null;
  }

  return (
        <MenuContainer isHidden={isHidden}>
          <div id="nav" className="nav">
              <Icon 
                id="handleMenu" 
                type="menu" 
                className="nav_icon"
                style={{fontSize: '20px'}}
                onClick={() => handleMenu()} 
              />
          </div>

          <Zoom 
            key="zoom"
            isHidden={props.menuIsHidden}
            map={map}
          />

          <label>Categoria</label>
          <Select id="select" defaultValue={defaultCategory} onChange={handleCategory}>
            {categories.map(c => <Option key={c[0]} value={c[0]}><Link to={c[1]}>{c[0]}</Link></Option>)}
          </Select>

          {watershedsLabel}
          {watershedSelect}

          <label>Ano</label>
          <Select id="select" defaultValue={defaultYear} onChange={props.handleYears} >
            {years.map(y => <Option key={y} value={y}>{y}</Option>)}
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
}

export default Menu;