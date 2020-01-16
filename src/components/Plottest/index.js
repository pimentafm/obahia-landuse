import React from 'react';
import Plot from 'react-plotly.js';

import { PlotContainer } from './styles';

class Plottest extends React.Component {
    state = {
      forest: {
        x: [],
        y: [],
      },
      savanna: {
        x: [],
        y: [],
      },
      grass: {
        x: [],
        y: [],
      },
      croppast: {
        x: [],
        y: []
      },
      raincrop: {
        x: [],
        y: []
      },
      irrcrop: {
        x: [],
        y: []
      },
      past: {
        x: [],
        y: []
      },
      water: {
        x: [],
        y: []
      },
      urban: {
        x: [],
        y: []
      },
    };

    componentDidMount() {
      fetch('http://localhost/obahia-webmap/api/totallanduse-stats.php', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => response.json())
        .then((jsonResponse) => {
          this.setState({forest: {x: jsonResponse.map(j => j.year)}});
          this.setState({forest: {y: jsonResponse.map(j => j.forest)}});

          this.setState({savanna: {x: jsonResponse.map(j => j.year)}});
          this.setState({savanna: {y: jsonResponse.map(j => j.savanna)}});

          this.setState({grass: {x: jsonResponse.map(j => j.year)}});
          this.setState({grass: {y: jsonResponse.map(j => j.grass)}});

          this.setState({croppast: {x: jsonResponse.map(j => j.year)}});
          this.setState({croppast: {y: jsonResponse.map(j => j.croppast)}});

          this.setState({raincrop: {x: jsonResponse.map(j => j.year)}});
          this.setState({raincrop: {y: jsonResponse.map(j => j.raincrop)}});

          this.setState({irrcrop: {x: jsonResponse.map(j => j.year)}});
          this.setState({irrcrop: {y: jsonResponse.map(j => j.irrcrop)}});

          this.setState({past: {x: jsonResponse.map(j => j.year)}});
          this.setState({past: {y: jsonResponse.map(j => j.past)}});

          this.setState({water: {x: jsonResponse.map(j => j.year)}});
          this.setState({water: {y: jsonResponse.map(j => j.water)}});

          this.setState({urban: {x: jsonResponse.map(j => j.year)}});
          this.setState({urban: {y: jsonResponse.map(j => j.urban)}});
        })
    }

  render() {
    return (
      <PlotContainer>
      <Plot
        data={[
            {
              x: this.state.forest.x,
              y: this.state.forest.y,
              name: 'Formações florestais',
              line: {
                color: '#004000'},
            },
            {
              x: this.state.savanna.x,
              y: this.state.savanna.y,
              name: 'Formações savânicas',
              line: {color: '#77a605'},
            },
            {
              x: this.state.grass.x,
              y: this.state.grass.y,
              name: 'Formações campestres',
              line: {color: '#b8af4f'},
            },
            {
              x: this.state.croppast.x,
              y: this.state.croppast.y,
              name: 'Mosáico de agricultura ou pastagem',
              line: {color: '#f6e6db'},
            },
            {
              x: this.state.raincrop.x,
              y: this.state.raincrop.y,
              name: 'Agricultura de sequeiro',
              line: {color: '#ffcaff'},
            },
            {
              x: this.state.irrcrop.x,
              y: this.state.irrcrop.y,
              name: 'Agricultura irrigada',
              line: {color: '#ff42f9'},
            },
            {
              x: this.state.past.x,
              y: this.state.past.y,
              name: 'Pastagem',
              line: {color: '#f4f286'},
            },
            {
              x: this.state.water.x,
              y: this.state.water.y,
              name: `Córpos d'água`,
              line: {color: '#0000ff'},
            },
            {
              x: this.state.urban.x,
              y: this.state.urban.y,
              name: 'Área urbana',
              line: {color: '#ff0000'},
            },
        ]}
        layout={ 
          {
            autosize: true, 
            title: 'Grafico teste',
            showlegend: false,
            
            margin: {t:80, r: 20, l: 20, b: 20}
          } 
        }
      />
      </PlotContainer>
    );
  }
}

export default Plottest;