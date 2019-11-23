import React from 'react';
import { Select } from 'antd';

import { Container } from './styles';

import "antd/dist/antd.css";

const { Option } = Select;

class Card extends React.Component {
  state = {
    defaultYear: 2018,
    defaultCategory: 'Região',
    categories: ['Região', 'Bacia hidrográfica'],
    years: Array.from(new Array(29),(val,index) => index+1990)
  }

  handleYears = e => {
    console.log('Ano: ' + e);
  }

  handleCategories = e => {
    console.log(this.state.defaultCategory);
  }

  render () {
    return (
      <Container>
        <Select id="select" defaultValue={this.state.defaultCategory} onChange={this.handleCategories}>
          {this.state.categories.map(c => <Option key={c} value={c}>{c}</Option>)}
        </Select>
        <Select id="select" defaultValue={this.state.defaultYear} onChange={this.handleYears} >
          {this.state.years.map(y => <Option key={y} value={y}>{y}</Option>)}
        </Select>
        
      </Container>
    );
  }
}

export default Card;