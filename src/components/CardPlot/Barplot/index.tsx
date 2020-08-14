import React, { useState, useEffect } from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

import { oba } from '../../../services';

import { useTranslation } from 'react-i18next';

interface BarPlotData {
  data: Object;
}

interface BarplotProps {
  year: number;
  tableName: string;
}

const Barplot: React.FC<BarplotProps> = ({ year, tableName }) => {
  const { t } = useTranslation();
  
  const [landuse, setData] = useState([]);

  const [colors] = useState([
    '#004000',
    '#77a605',
    '#b8af4f',
    '#f6e6db',
    '#ffcaff',
    '#ff42f9',
    '#f4f286',
    '#0000ff',
    '#ff0000',
  ]);

  const [xaxis, setXAxis] = useState([
    t('label_forest'),
    t('label_savanna'),
    t('label_grasslands'),
    t('label_mosaic'),
    t('label_rainfed'),
    t('label_irrigated'),
    t('label_pasture'),
    t('label_water'),
    t('label_urban'),
  ]);

  const data = [
    {
      x: xaxis,
      y: landuse,
      stackgroup: 'one',
      type: 'bar',
      hovertemplate: '%{y:.5f} x 10<sup>3</sup> km<sup>2</sup><extra></extra>',
      marker: { color: colors },
    },
  ];

  const layout = {
    title: {
      font: {
        family: 'Arial, sans-serif',
        size: 14,
      },
    },
    height: 300,
    xaxis: {
      title: {
        text: 'Classes',
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
      showticklabels: false,
      ticks: 'outside',
      tickcolor: '#000',
    },
    yaxis: {
      title: {
        text: t('label_plot_yaxis'),
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
      dtick: 6,
      ticklen: 6,
      tickwidth: 1,
      tickcolor: '#000',
    },
    showlegend: false,
    margin: { l: 60, r: 10, t: 0, b: 50 },
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

  useEffect(() => {
    oba
      .post('region/', {
        year1: year,
        year2: year,
        table_name: tableName,
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        let data = response.data.map((j: BarPlotData) => Object.values(j));
        setData(data[0]);
      })
      .catch(e => {
        throw new Error('Do not load Barplot data');
      });

      setXAxis([
        t('label_forest'),
        t('label_savanna'),
        t('label_grasslands'),
        t('label_mosaic'),
        t('label_rainfed'),
        t('label_irrigated'),
        t('label_pasture'),
        t('label_water'),
        t('label_urban'),
      ]);
  }, [year, tableName, t]);

  return <PlotlyChart data={data} layout={layout} config={config} />;
};

export default Barplot;
