import React, { Component } from 'react';
import { calculateEbac } from './functions';
var Chart = require('chart.js');

class BACGraph extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.chart = null;
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        this.chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: "#3490dc",
                    borderColor: "#3490dc",
                    fill: false,
                },
                {
                    data: [],
                    backgroundColor: "#e3342f",
                    borderColor: "#e3342f",
                    borderDash: [20, 3, 3, 3, 3, 3, 3, 3],
                    fill: false,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate() {
        let drinks = this.props.drinks;
        let sex = this.props.sex;
        let weight = this.props.weight;
        let labels = [];
        let measurements = [];

        let currentTime = new Date();

        if (drinks.length > 0) {
            let time = new Date(drinks[0].startTime.getTime());
            let lastDot = new Date(drinks[drinks.length - 1].startTime.getTime());
            lastDot.setHours(lastDot.getHours() + 2);
            let bac = 0;
            let consideredDrinks = [];
            do {
                consideredDrinks = drinks.filter(drink => drink.startTime <= time);
                bac = calculateEbac(consideredDrinks, time, { sex: sex, weight: weight });
                if (time < lastDot) {
                    labels.push(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
                    measurements.push(bac);
                }
                time.setMinutes(time.getMinutes() + 30);
            } while ((bac > 0.01 || drinks.length !== consideredDrinks.length) && time < currentTime);

            if (time > currentTime) {
                labels.push(('0' + currentTime.getHours()).slice(-2) + ':' + ('0' + currentTime.getMinutes()).slice(-2));
                bac = calculateEbac(drinks, currentTime, { sex: sex, weight: weight });
                measurements.push(bac);
            } else {
                labels.push(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
                let comeDown = Array(labels.length - 1).fill(null);
                comeDown[comeDown.length - 1] = measurements[measurements.length - 1];
                bac = calculateEbac(drinks, time, { sex: sex, weight: weight });
                comeDown.push(bac);
                this.chart.data.datasets[1].data = comeDown;
            }
        }

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = measurements;
        this.chart.update();
    }

    render() {
        return (
            <canvas
                style={{ width: '100%' }}
                className="mt-3"
                ref={this.canvas}
            />
        );
    }
}

export default BACGraph;
