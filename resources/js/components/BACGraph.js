import React, {Component} from 'react';
import {ebacSteps} from './functions';
const Chart = require('chart.js');

class BACGraph extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.chart = null;
    this.updateGraph = this.updateGraph.bind(this);
  }

  updateGraph() {
    const data = ebacSteps(this.props.drinks, this.props.userData);
    this.chart.data.labels = data.output.keys;
    this.chart.data.datasets[0].data = data.output.values;
    this.chart.data.datasets[1].data = data.comeDown.values;
    this.chart.update();
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: '#3490dc',
          borderColor: '#3490dc',
          fill: false,
        },
        {
          data: [],
          backgroundColor: '#e3342f',
          borderColor: '#e3342f',
          borderDash: [20, 3, 3, 3, 3, 3, 3, 3],
          fill: false,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  render() {
    return (
      <canvas
        style={{width: '100%'}}
        className="mt-3"
        ref={this.canvas}
      />
    );
  }
}

export default BACGraph;
