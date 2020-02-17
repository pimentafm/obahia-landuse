import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import oba from "../../services/api";

import { PlotContainer } from "./styles";

const Stackplot = props => {
  const [forest, setForest] = useState(null);
  const [savanna, setSavanna] = useState(null);
  const [grass, setGrass] = useState(null);
  const [croppast, setCroppast] = useState(null);
  const [raincrop, setRaincrop] = useState(null);
  const [irrcrop, setIrrcrop] = useState(null);
  const [past, setPast] = useState(null);
  const [water, setWater] = useState(null);
  const [urban, setUrban] = useState(null);
  const [xaxis] = useState(
    Array.from(new Array(29), (val, index) => index + 1990)
  );

  useEffect(() => {
    oba
      .post("region/", {
        year1: 1990,
        year2: 2018,
        table_name: "landuse",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        setForest(response.data.map(j => j.forest));
        setSavanna(response.data.map(j => j.savanna));
        setGrass(response.data.map(j => j.grass));
        setCroppast(response.data.map(j => j.croppast));
        setRaincrop(response.data.map(j => j.raincrop));
        setIrrcrop(response.data.map(j => j.irrcrop));
        setPast(response.data.map(j => j.past));
        setWater(response.data.map(j => j.water));
        setUrban(response.data.map(j => j.urban));
      })
      .catch(e => {
        this.errors.push(e);
      });
  }, []);

  return (
    <PlotContainer>
      <Plot
        data={[
          {
            x: xaxis,
            y: urban,
            stackgroup: "one",
            fillcolor: "#ff0000",
            type: "scatter",
            name: "Área urbana",
            line: { color: "#ff0000" }
          },
          {
            x: xaxis,
            y: water,
            stackgroup: "one",
            fillcolor: "#0000ff",
            type: "scatter",
            name: `Córpos d'água`,
            line: { color: "#0000ff" }
          },
          {
            x: xaxis,
            y: past,
            stackgroup: "one",
            fillcolor: "#f4f286",
            type: "scatter",
            name: "Pastagem",
            line: { color: "#f4f286" }
          },
          {
            x: xaxis,
            y: irrcrop,
            stackgroup: "one",
            fillcolor: "#ff42f9",
            type: "scatter",
            name: "Agricultura irrigada",
            line: { color: "#ff42f9" }
          },
          {
            x: xaxis,
            y: raincrop,
            stackgroup: "one",
            fillcolor: "#ffcaff",
            type: "scatter",
            name: "Agricultura de sequeiro",
            line: { color: "#ffcaff" }
          },
          {
            x: xaxis,
            y: croppast,
            stackgroup: "one",
            fillcolor: "#f6e6db",
            type: "scatter",
            name: "Mosáico de agricultura ou pastagem",
            line: { color: "#f6e6db" }
          },
          {
            x: xaxis,
            y: grass,
            stackgroup: "one",
            fillcolor: "#b8af4f",
            type: "scatter",
            name: "Formações campestres",
            line: { color: "#b8af4f" }
          },
          {
            x: xaxis,
            y: savanna,
            stackgroup: "one",
            fillcolor: "#77a605",
            type: "scatter",
            name: "Formações savânicas",
            line: { color: "#77a605" }
          },
          {
            x: xaxis,
            y: forest,
            stackgroup: "one",
            fillcolor: "#004000",
            type: "scatter",
            name: "Formações florestais",
            line: { color: "#004000" }
          }
        ]}
        layout={{
          title: {
            text:
              "<b>Cobertura e uso do solo (1990 - 2018) - Rio</b>",
            font: {
              family: "Arial, sans-serif",
              size: 24
            }
          },
          autosize: true,
          xaxis: {
            title: {
              text: "Anos"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 18,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 16,
              color: "black"
            },
            autotick: false,
            ticks: "outside",
            tick0: 1990,
            dtick: 5,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          yaxis: {
            title: {
              text: "Uso e Cobertura do solo (1000 km²)"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 18,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 16,
              color: "black"
            },

            autotick: false,
            ticks: "outside",
            tick0: 0,
            dtick: 20,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          showlegend: false,
          margin: { l: 60, r: 10, t: 80, b: 50 }
        }}
        config={{
          displaylogo: false
        }}
      />
    </PlotContainer>
  );
};

export default Stackplot;
