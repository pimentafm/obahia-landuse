import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

import { PlotContainer } from './styles';

class Stackplot extends React.Component {
    state = {
      forest: {
        x: [],
      },
      savanna: {
        x: [],
      },
      grass: {
        x: [],
      },
      croppast: {
        x: [],
      },
      raincrop: {
        x: [],
      },
      irrcrop: {
        x: [],
      },
      past: {
        x: [],
      },
      water: {
        x: [],
      },
      urban: {
        x: [],
      },
      xaxis: Array.from(new Array(29),(val,index) => index+1990)
    };
    
    componentDidMount() {
        axios.post('http://localhost/obahia-webmap/api/totallanduse-stats.php',{
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then(response => {
            this.setState({forest: {y: response.data.map(j => j.forest)}});
            this.setState({savanna: {y: response.data.map(j => j.savanna)}});
            this.setState({grass: {y: response.data.map(j => j.grass)}});
            this.setState({croppast: {y: response.data.map(j => j.croppast)}});
            this.setState({raincrop: {y: response.data.map(j => j.raincrop)}});
            this.setState({irrcrop: {y: response.data.map(j => j.irrcrop)}});
            this.setState({past: {y: response.data.map(j => j.past)}});
            this.setState({water: {y: response.data.map(j => j.water)}});
            this.setState({urban: {y: response.data.map(j => j.urban)}});
          })
          .catch(e => {
          this.errors.push(e)
          })
    }
  
  render() {
    return (
      <PlotContainer>
      <Plot
        data={[
          {
            x: this.state.xaxis,
            y: this.state.urban.y,
            stackgroup: 'one',
            fillcolor: '#ff0000',
            type: 'scatter',
            name: 'Área urbana',
            line: {color: '#ff0000'},
          },
          {
            x: this.state.xaxis,
            y: this.state.water.y,
            stackgroup: 'one',
            fillcolor: '#0000ff',
            type: 'scatter',
            name: `Córpos d'água`,
            line: {color: '#0000ff'},
          },
          {
            x: this.state.xaxis,
            y: this.state.past.y,
            stackgroup: 'one',
            fillcolor: '#f4f286',
            type: 'scatter',
            name: 'Pastagem',
            line: {color: '#f4f286'},
          },
          {
            x: this.state.xaxis,
            y: this.state.irrcrop.y,
            stackgroup: 'one',
            fillcolor: '#ff42f9',
            type: 'scatter',
            name: 'Agricultura irrigada',
            line: {color: '#ff42f9'},
          },
          {
            x: this.state.xaxis,
            y: this.state.raincrop.y,
            stackgroup: 'one',
            fillcolor: '#ffcaff',
            type: 'scatter',
            name: 'Agricultura de sequeiro',
            line: {color: '#ffcaff'},
          },
          {
            x: this.state.xaxis,
            y: this.state.croppast.y,
            stackgroup: 'one',
            fillcolor: '#f6e6db',
            type: 'scatter',
            name: 'Mosáico de agricultura ou pastagem',
            line: {color: '#f6e6db'},
          },
          {
            x: this.state.xaxis,
            y: this.state.grass.y,
            stackgroup: 'one',
            fillcolor: '#b8af4f',
            type: 'scatter',
            name: 'Formações campestres',
            line: {color: '#b8af4f'},
          },
          {
            x: this.state.xaxis,
            y: this.state.savanna.y,
            stackgroup: 'one',
            fillcolor: '#77a605',
            type: 'scatter',
            name: 'Formações savânicas',
            line: {color: '#77a605'},
          },
          {
            x: this.state.xaxis,
            y: this.state.forest.y,
            stackgroup: 'one',
            fillcolor: '#004000',
            type: 'scatter',
            name: 'Formações florestais',
            line: {color: '#004000'},
          }
        ]}
        layout={ 
          {
            autosize: true,
            //width: 800,
            //height: 400, 
            xaxis: {
              title: {
                text: 'Anos'
              },
              autotick: false,
              ticks: 'outside',
              tick0: 1990,
              dtick: 5,
              ticklen: 8,
              tickwidth: 2,
              tickcolor: '#000'
            },
            yaxis: {
              title: {
                text: 'Uso e Cobertura do solo (1000 km²)'
              },
              autotick: false,
              ticks: 'outside',
              tick0: 0,
              dtick: 20,
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

export default Stackplot;