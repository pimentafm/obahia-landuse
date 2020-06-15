import React, { useState, useEffect } from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

import { oba } from '../../../services';

interface StackPlotData {
  forest: Object;
  savanna: Object;
  grass: Object;
  croppast: Object;
  raincrop: Object;
  irrcrop: Object;
  past: Object;
  water: Object;
  urban: Object;
}

interface StackPlotData {
  classname: string;
  areakm2: string;
}

interface StackPlotProps {
  watershed: string;
  tableName: string;
}

const StackPlot: React.FC<StackPlotProps> = ({ watershed, tableName }) => {
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
    Array.from(new Array(29), (val, index) => index + 1990),
  );

  useEffect(() => {
    oba
      .post('gcc/', {
        year1: 1990,
        year2: 2018,
        gcc: watershed,
        table_name: tableName,
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        setForest(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Forest formations')
            .map((a: StackPlotData) => a.areakm2),
        );
        setSavanna(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Savanna formations')
            .map((a: StackPlotData) => a.areakm2),
        );
        setGrass(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Grasslands')
            .map((a: StackPlotData) => a.areakm2),
        );
        setCroppast(
          response.data
            .filter(
              (f: StackPlotData) =>
                f.classname === 'Mosaic of crop and pasture',
            )
            .map((a: StackPlotData) => a.areakm2),
        );
        setRaincrop(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Rainfed crop')
            .map((a: StackPlotData) => a.areakm2),
        );
        setIrrcrop(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Irrigated crop')
            .map((a: StackPlotData) => a.areakm2),
        );
        setPast(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Pasturelands')
            .map((a: StackPlotData) => a.areakm2),
        );
        setWater(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Water bodies')
            .map((a: StackPlotData) => a.areakm2),
        );
        setUrban(
          response.data
            .filter((f: StackPlotData) => f.classname === 'Urban areas')
            .map((a: StackPlotData) => a.areakm2),
        );
      })
      .catch(e => {
        throw new Error('Do not load StackPlot data');
      });
  }, [watershed, tableName]);

  const data = [
    {
      x: xaxis,
      y: urban,
      stackgroup: 'one',
      fillcolor: '#ff0000',
      type: 'scatter',
      name: 'Área urbana',
      line: { color: '#ff0000' },
    },
    {
      x: xaxis,
      y: water,
      stackgroup: 'one',
      fillcolor: '#0000ff',
      type: 'scatter',
      name: `Córpos d'água`,
      line: { color: '#0000ff' },
    },
    {
      x: xaxis,
      y: past,
      stackgroup: 'one',
      fillcolor: '#f4f286',
      type: 'scatter',
      name: 'Pastagem',
      line: { color: '#f4f286' },
    },
    {
      x: xaxis,
      y: irrcrop,
      stackgroup: 'one',
      fillcolor: '#ff42f9',
      type: 'scatter',
      name: 'Agricultura irrigada',
      line: { color: '#ff42f9' },
    },
    {
      x: xaxis,
      y: raincrop,
      stackgroup: 'one',
      fillcolor: '#ffcaff',
      type: 'scatter',
      name: 'Agricultura de sequeiro',
      line: { color: '#ffcaff' },
    },
    {
      x: xaxis,
      y: croppast,
      stackgroup: 'one',
      fillcolor: '#f6e6db',
      type: 'scatter',
      name: 'Mosáico de agricultura ou pastagem',
      line: { color: '#f6e6db' },
    },
    {
      x: xaxis,
      y: grass,
      stackgroup: 'one',
      fillcolor: '#b8af4f',
      type: 'scatter',
      name: 'Formações campestres',
      line: { color: '#b8af4f' },
    },
    {
      x: xaxis,
      y: savanna,
      stackgroup: 'one',
      fillcolor: '#77a605',
      type: 'scatter',
      name: 'Formações savânicas',
      line: { color: '#77a605' },
    },
    {
      x: xaxis,
      y: forest,
      stackgroup: 'one',
      fillcolor: '#004000',
      type: 'scatter',
      name: 'Formações florestais',
      line: { color: '#004000' },
    },
  ];
  const layout = {
    title: {
      //text: '<b>Cobertura e uso do solo (1990 - 2018)</b>',
      font: {
        family: 'Arial, sans-serif',
        size: 14,
      },
    },
    height: 300,
    xaxis: {
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },
      autotick: false,
      ticks: 'outside',
      tick0: 1990,
      dtick: 5,
      ticklen: 6,
      tickwidth: 1,
      tickcolor: '#000',
    },
    yaxis: {
      title: {
        text: 'Uso e Cobertura do solo (1000 km²)',
      },
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },

      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 8,
      ticklen: 6,
      tickwidth: 1,
      tickcolor: '#000',
    },
    showlegend: false,
    margin: { l: 60, r: 10, t: 10, b: 30 },
    transition: {
      duration: 1000,
      easing: 'quad-in-out',
      ordering: 'traces first',
    },
  };

  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['zoom2d', 'select2d', 'lasso2d'],
  };

  return <PlotlyChart data={data} layout={layout} config={config} />;
};

export default StackPlot;
