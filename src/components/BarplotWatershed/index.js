import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import oba from "../../services/api";

import { PlotContainer } from "./styles";

const Barplot = props => {
  const [defaultYear, setYear] = useState([]);
  const [defaultWatershed, setWatershed] = useState([]);
  const [landuse, setLanduseData] = useState([]);
  const [colors] = useState([
    "#004000",
    "#77a605",
    "#b8af4f",
    "#f6e6db",
    "#ffcaff",
    "#ff42f9",
    "#f4f286",
    "#0000ff",
    "#ff0000"
  ]);
  const [xaxis] = useState([
    "Formações florestais",
    "Formações savânicas",
    "Formações campestres",
    "Mosaico Agricultura/Pastagem",
    "Agricultura de sequeiro",
    "Agricultura irrigada",
    "Pastagem",
    "Corpos dágua",
    "Área urbana/Construções rurais"
  ]);

  useEffect(() => {
    setYear(props.defaultYear);
    setWatershed(props.defaultWatershed);

    oba
      .post("gcc/", {
        year1: props.defaultYear,
        year2: props.defaultYear,
        gcc: props.defaultWatershed,
        table_name: "landuse",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        const data = response.data.filter(f => f.classname).map(a => a.areakm2);
        setLanduseData(data);
      })
      .catch(e => {
        this.errors.push(e);
      });
  }, [props.defaultYear, props.defaultWatershed, props.landuse]);

  return (
    <PlotContainer>
      <Plot
        data={[
          {
            x: xaxis,
            y: landuse,
            stackgroup: "one",
            type: "bar",
            marker: { color: colors }
          }
        ]}
        layout={{
          title: {
            text:
              "<b>Cobertura e uso do solo (" +
              defaultYear +
              ") - Rio " +
              defaultWatershed +
              "</b>",
            font: {
              family: "Arial, sans-serif",
              size: 14
            }
          },
          autosize: false,
          width: 500,
          height: 300,
          xaxis: {
            title: {
              text: "Classes"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "black"
            },
            autotick: false,
            showticklabels: false,
            ticks: "outside",
            tickcolor: "#000"
          },
          yaxis: {
            title: {
              text: "Uso e Cobertura do solo (1000 km²)"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "black"
            },

            autotick: false,
            ticks: "outside",
            tick0: 0,
            dtick: 3,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          showlegend: false,
          margin: { l: 60, r: 10, t: 70, b: 50 }
        }}
        config={{
          displaylogo: false
        }}
      />
    </PlotContainer>
  );
};

export default Barplot;
