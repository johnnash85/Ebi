import React from 'react';
import { Chart } from "react-google-charts";


/*
const options = {
    chart: {
        title: "Prueba de grafico",
    },
    hAxis: { title: "", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "", viewWindow: { min: 0, max: 15 } },
    legend: "none"
};*/

const options = {
    annotations: {
        stem: {
            color: '#097138'
        },
        style: 'line'
    },
    legend: 'none',
    colors: ['#a52714'],
    /*  chart: {
          title: "Prueba de grafico",
      },
      width: 900,
      height: 500,
      series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: { axis: "Call" },
          1: { axis: "Stock" },
      },
      axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
              Value: { label: "Value" },
              Value1: { label: "Value" },
              //Daylight: { label: "Daylight" },
          },
      },*/
};

/*
const data = [
    ["Age", "Weight"],
    [0, 1, null],
    [1, 1.5, null],
    [2, 2, '2'],
    [3, 2.5, null],
    [4, 3, null],
    [5, 3.5, null]

];*/
const data = [
    ['', { role: 'annotation', type: 'string' }, 'Value'],
    ['1', null, 0.48],
    ['1.5', 'Stock Price', 0.48],
    ['2', null, 0.48],
    ['3', null, 0.48],
    ['4', null, 0],
    ['5', null, -0.36]
];/*
const data = [
    [
       // { type: "date", label: "Value" },
        "Average temperature", { role: 'annotation', type: 'string' },
        "Average hours of daylight",
    ],
    [new Date(2014, 0), -0.5, null],
    [new Date(2014, 1), 0.4, null],
    [new Date(2014, 2), 0.5, null],
    [new Date(2014, 3), 2.9, null],
    [new Date(2014, 4), 6.3, null],
    [new Date(2014, 5), 9, '2'],
    [new Date(2014, 6), 10.6, null],
    [new Date(2014, 7), 10.3, null],
    [new Date(2014, 8), 7.4, null],
    [new Date(2014, 9), 4.4, null],
    [new Date(2014, 10), 1.1, null],
    [new Date(2014, 11), -0.2, null],
];
*/

export default function PlStatus(props) {
    return (
        <div style={{
            "marginTop": "10px",
            "marginBottom": "10px"
        }}>
            <Chart
                chartType="LineChart"
                data={data}
                options={options}
                width="100%"
                height="400px"
                legendToggle
            />
        </div>
    );
}

//BarChart Line