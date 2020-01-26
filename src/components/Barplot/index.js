import React from 'react';
import Plot from 'react-plotly.js';

import oba from '../../services/api';

import { PlotContainer } from './styles';

class Barplot extends React.Component {
  state = {
    defaultYear: this.props.defaultYear,
    landuse: [],
    colors: ['#004000', '#77a605', '#b8af4f', '#f6e6db' , '#ffcaff', '#ff42f9' , '#f4f286', '#0000ff', '#ff0000'],
    xaxis: ['Formações florestais', 'Formações savânicas', 'Formações campestres', 'Mosaico Agricultura/Pastagem', 'Agricultura de sequeiro', 'Agricultura irrigada', 'Pastagem', 'Corpos dágua', 'Área urbana/Construções rurais']
  };

  componentDidMount() {
    oba.post('landuseyear/', {
      year: this.state.defaultYear,
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => {
      let data = response.data.map(j => Object.values(j))
      data = data[0];

      this.setState({landuse: data});
    }).catch(e => {this.errors.push(e)})
  }

  render() {
    return (
      <PlotContainer>
      <Plot
        data={[
          {
            x: this.state.xaxis,
            y: this.state.landuse,
            stackgroup: 'one',
            type: 'bar',
            marker: {color: this.state.colors},
          }
        ]}
        layout={ 
          {
            autosize: true,
            xaxis: {
              title: {
                text: 'Classes'
              },
              titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: '#000'
              },
              tickfont: {
                family: 'Arial, sans-serif',
                size: 16,
                color: 'black'
              },
              autotick: false,
              showticklabels: false,
              ticks: 'outside',
              tickcolor: '#000'
            },
            yaxis: {
              title: {
                text: 'Uso e Cobertura do solo (1000 km²)'
              },
              titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: '#000'
              },
              tickfont: {
                family: 'Arial, sans-serif',
                size: 16,
                color: 'black'
              },

              autotick: false,
              ticks: 'outside',
              tick0: 0,
              dtick: 6,
              ticklen: 8,
              tickwidth: 2,
              tickcolor: '#000'
            },
            showlegend: false,
            margin: {l: 60, r: 10, t: 10, b: 50}
          } 
        }
        config={
          {
            displaylogo: false
          }
        }
      />
      </PlotContainer>
    );
  }
}

export default Barplot;