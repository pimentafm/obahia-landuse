import React from 'react';
import { Select, Icon} from 'antd';

import { Container } from './styles';

import "antd/dist/antd.css";

const { Option } = Select;

class Card extends React.Component {
  state = {
    defaultYear: this.props.defaultYear,
    defaultCategory: this.props.defaultCategory,
    categories: ['Região', 'Bacia hidrográfica'],
    years: Array.from(new Array(29),(val,index) => index+1990)
  }

  handleYears = e => {
    this.setState({defaultYear: e});
  }

  handleCategories = e => {
    this.setState({defaultCategory: e});
  }

  render () {
    return (
      <Container>
        <div id="div-title">
          <label id="label-title">Sistema de Inteligência Territorial Estratégica</label>
          <a id="help-button" type="button" href="http://obahia.dea.ufv.br/help/" target="_Blank">
            <Icon id="icon" type="bulb" theme="twoTone" style={{fontSize: "20px"}}/>
          </a>
        </div>
        <label>Categoria</label>
        <Select id="select" defaultValue={this.state.defaultCategory} onChange={this.handleCategories}>
          {this.state.categories.map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>
        <label>Ano</label>
        <Select id="select" defaultValue={this.state.defaultYear} onChange={this.handleYears} >
          {this.state.years.map(y => <Option key={y} value={y}>{y}</Option>)}
        </Select>
      </Container>
    );
  }
}

export default Card;