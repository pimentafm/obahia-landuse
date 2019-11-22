import React from 'react';
import { Select } from 'antd';

import { Container } from './styles';

import "antd/dist/antd.css";

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}
  
export default function Card() {
  return (
    <Container>
      <Select id="select" defaultValue="Region" onChange={handleChange} >
        <Option value="Region">Region</Option>
        <Option value="Watersheds">Watersheds</Option>
      </Select>
      <Select id="select" defaultValue="Year" onChange={handleChange} >
        <Option value="2018">2018</Option>
        <Option value="1990">1990</Option>
      </Select>

    </Container>
  );
}