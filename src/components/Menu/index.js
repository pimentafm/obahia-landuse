import React from 'react';

import { Select, Icon} from 'antd';

import { MenuContainer } from './styles';
import LayerSwitcher from '../../components/LayerSwitcher';

import "antd/dist/antd.css";

const { Option } = Select;

class Menu extends React.Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCategory: this.props.defaultCategory,
    categories: ['Região', 'Bacia hidrográfica'],
    years: Array.from(new Array(29),(val,index) => index+1990),
    isHidden: this.props.isHidden,
  }

  handleCategories = e => {
    this.setState({defaultCategory: e});
  }

  handleMenu = () => {
    if(this.state.isHidden === false) {
      this.setState({isHidden: true});
    } else {
      this.setState({isHidden: false});
    }
  }

  render () {
    return (
        <MenuContainer isHidden={this.state.isHidden}>
          <div id="nav" className="nav">
              <Icon 
                id="handleMenu" 
                type="menu" 
                className="nav_icon"
                style={{fontSize: '20px'}}
                onClick={() => this.handleMenu()} 
              />
          </div>
          <label>Categoria</label>
          <Select id="select" defaultValue={this.state.defaultCategory} onChange={this.handleCategories}>
            {this.state.categories.map(c => <Option key={c} value={c}>{c}</Option>)}
          </Select>
          <label>Ano</label>
          <Select id="select" defaultValue={this.state.defaultYear} onChange={this.props.handleYears} >
            {this.state.years.map(y => <Option key={y} value={y}>{y}</Option>)}
          </Select>
          <LayerSwitcher  onOffLandsat={this.props.onOffLandsat} onOffLanduse={this.props.onOffLanduse} />
        </MenuContainer>
    );
  }
}

export default Menu;