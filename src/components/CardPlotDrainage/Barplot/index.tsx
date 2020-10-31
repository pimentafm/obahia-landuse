import React, { useState, useEffect } from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

import { oba } from '../../../services';

import { useTranslation } from 'react-i18next';

interface BarPlotData {
  classname: string;
  areakm2: string;
}

interface BarplotProps {
  year: number;
  code: number;
  tableName: string;
}

const Barplot: React.FC<BarplotProps> = ({ year, code, tableName }) => {
  const { t } = useTranslation();

  const [landuse, setData] = useState<number[]>([]);

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
      dtick: 1,
      ticklen: 6,
      tickwidth: 1,
      tickcolor: '#000',
    },
    showlegend: false,
    margin: { l: 60, r: 10, t: 10, b: 50 },
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
      .post('drain/', {
        year1: year,
        year2: year,
        code: code,
        table_name: tableName,
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        const forest = response.data
          .filter((f: BarPlotData) => f.classname === 'Forest formations')
          .map((a: BarPlotData) => a.areakm2);

        const savanna = response.data
          .filter((f: BarPlotData) => f.classname === 'Savanna formations')
          .map((a: BarPlotData) => a.areakm2);

        const grasslands = response.data
          .filter((f: BarPlotData) => f.classname === 'Grasslands')
          .map((a: BarPlotData) => a.areakm2);

        const mosaic = response.data
          .filter(
            (f: BarPlotData) => f.classname === 'Mosaic of crop and pasture',
          )
          .map((a: BarPlotData) => a.areakm2);

        const rainfed = response.data
          .filter((f: BarPlotData) => f.classname === 'Rainfed crop')
          .map((a: BarPlotData) => a.areakm2);

        const irrigated = response.data
          .filter((f: BarPlotData) => f.classname === 'Irrigated crop')
          .map((a: BarPlotData) => a.areakm2);

        const pasture = response.data
          .filter((f: BarPlotData) => f.classname === 'Pasturelands')
          .map((a: BarPlotData) => a.areakm2);

        const water = response.data
          .filter((f: BarPlotData) => f.classname === 'Water bodies')
          .map((a: BarPlotData) => a.areakm2);

        const urban = response.data
          .filter((f: BarPlotData) => f.classname === 'Urban areas')
          .map((a: BarPlotData) => a.areakm2);

        let dataArray: number[] = [
          forest[0],
          savanna[0],
          grasslands[0],
          mosaic[0],
          rainfed[0],
          irrigated[0],
          pasture[0],
          water[0],
          urban[0],
        ];

        setData(dataArray);
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
  }, [year, code, tableName, t]);

  return <PlotlyChart data={data} layout={layout} config={config} />;
};

export default Barplot;
