import React from 'react';
import { Select, Icon} from 'antd';

import { CardContainer } from './styles';
import LayerSwitcher from '../../components/LayerSwitcher';

import "antd/dist/antd.css";

const { Option } = Select;

class Card extends React.Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCategory: this.props.defaultCategory,
    categories: ['Região', 'Bacia hidrográfica'],
    years: Array.from(new Array(29),(val,index) => index+1990)
  }

  handleCategories = e => {
    this.setState({defaultCategory: e});
  }

  render () {
    return (
      <CardContainer>
        <div id="div-title">
          <label id="label-title">Sistema de Inteligência Territorial Estratégica</label>
          <a id="help-button" 
             type="button" 
             rel="noopener noreferrer" 
             href="http://obahia.dea.ufv.br/help/" 
             target="_Blank">
            <Icon id="icon" type="bulb" theme="twoTone" style={{fontSize: "20px"}}/>
          </a>
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
      </CardContainer>
    );
  }
}

export default Card;