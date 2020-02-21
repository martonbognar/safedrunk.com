import React, {Component} from 'react';
import {UNITS} from './data/units';
const Chart = require('chart.js');

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.chart = null;
    this.state = {
      sessions: ['', '', '', '', '', '', ''],
      numberOfDrinks: [0, 0, 0, 0, 0, 0, 0],
      alcoholConsumed: [0, 0, 0, 0, 0, 0, 0],
    };

    const self = this;

    axios.get(`/api/sessions/recent`)
        .then(function(response) {
          const sessionNames = response.data.map((session) => session.name);
          const sessionIds = response.data.map((session) => session.id);
          self.setState({sessions: sessionNames});

          for (let x = 0; x < sessionNames.length; ++x) {
            axios.get(`/api/sessions/${sessionIds[x]}/drinks`).then(function(response) {
              const copyNr = self.state.numberOfDrinks.slice();
              copyNr[x] = response.data.length;
              const copyAlc = self.state.alcoholConsumed.slice();

              copyAlc[x] = response.data.map((drink) => {
                return parseInt(UNITS[drink.unit]['multiplier'] * drink.amount, 10) * parseInt(drink.percentage, 10) / 100;
              }).reduce((s, a) => {
                return s + a;
              }, 0);

              self.setState({numberOfDrinks: copyNr, alcoholConsumed: copyAlc});
            }).catch(function(error) {
              console.error(error);
              alert('There was a connection error. Please try reloading the page.');
            });
          }
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  setState(obj) {
    super.setState(obj);
    if (obj.sessions) {
      this.chart.data.labels = obj.sessions;
      this.chart.update();
    }
    if (obj.numberOfDrinks) {
      this.chart.data.datasets[0].data = obj.numberOfDrinks;
      this.chart.update();
    }
    if (obj.alcoholConsumed) {
      this.chart.data.datasets[1].data = obj.alcoholConsumed;
      this.chart.update();
    }
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    const self = this;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: self.state.sessions,
        datasets: [
          {
            label: 'Number of drinks',
            data: self.state.numberOfDrinks,
            backgroundColor: '#3490dc',
          },
          {
            label: 'Amount of pure alcohol (cl)',
            data: self.state.alcoholConsumed,
            backgroundColor: '#e3342f',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <canvas
        style={{width: '100%'}}
        ref={this.canvas}
      />
    );
  }
}

export default Statistics;
