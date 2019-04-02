import React, { Component } from 'react';
var Chart = require('chart.js');

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.chart = null;
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        this.chart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                label: "# of Likes",
                data: [12, 19, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)"
                ]
              }
            ]
          }
        });
      }

      render() {
        return (
            <canvas
              style={{ width: 800, height: 300 }}
              ref={this.canvas}
            />
        );
      }
}

export default Statistics;
