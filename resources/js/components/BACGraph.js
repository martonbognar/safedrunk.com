import React, {Component} from 'react';
import {calculateEbac} from './functions';
const Chart = require('chart.js');

class BACGraph extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.chart = null;
    this.updateGraph = this.updateGraph.bind(this);
  }

  updateGraph() {
    const drinks = this.props.drinks;
    const sex = this.props.sex;
    const weight = this.props.weight;
    const labels = [];
    const measurements = [];

    const currentTime = new Date();

    if (drinks.length > 0) {
      let time = new Date(drinks[0].startTime.getTime());
      let lastDot = new Date(drinks[drinks.length - 1].startTime.getTime());
      drinks.forEach((drink) => {
        const current = new Date(drink.startTime.getTime());
        if (current < time) {
          time = current;
        }
        if (lastDot < current) {
          lastDot = current;
        }
      });
      lastDot.setHours(lastDot.getHours() + 2);
      let bac = 0;
      let consideredDrinks = [];
      do {
        consideredDrinks = drinks.filter((drink) => drink.startTime <= time);
        bac = calculateEbac(consideredDrinks, time, {sex: sex, weight: weight});
        if (time < lastDot) {
          labels.push(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
          measurements.push(bac);
        }
        time.setMinutes(time.getMinutes() + 30);
      } while ((bac > 0.01 || drinks.length !== consideredDrinks.length) && time < currentTime);

      if (time > currentTime) {
        labels.push(('0' + currentTime.getHours()).slice(-2) + ':' + ('0' + currentTime.getMinutes()).slice(-2));
        bac = calculateEbac(drinks, currentTime, {sex: sex, weight: weight});
        measurements.push(bac);
      } else {
        labels.push(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
        const comeDown = Array(labels.length - 1).fill(null);
        comeDown[comeDown.length - 1] = measurements[measurements.length - 1];
        bac = calculateEbac(drinks, time, {sex: sex, weight: weight});
        comeDown.push(bac);
        this.chart.data.datasets[1].data = comeDown;
      }
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = measurements;
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
