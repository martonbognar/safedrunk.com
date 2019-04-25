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
        let drinks = this.props.drinks;
        this.chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: drinks.map(drink => drink.name),
                datasets: [{
                    data: drinks.map((drink) => drink.amount),
                    backgroundColor: "#3490dc",
                    borderColor: "#3490dc",
                    fill: false,
                    label: "Blood Alcohol Content",
                }]
            },
            options: {
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

        if (drinks.length > 0) {
            let time = new Date(drinks[0].startTime.getTime());
            let bac = 0;
            do {
                time.setMinutes(time.getMinutes() + 30);
                labels.push(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
                bac = calculateEbac(drinks.filter(drink => drink.startTime < time), time, { sex: sex, weight: weight });
                measurements.push(bac);
            } while (bac > 0.01 && time < new Date());
        }

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = measurements;
        this.chart.update();
    }

    render() {
        return (
            <canvas
                style={{ width: '100%' }}
                ref={this.canvas}
            />
        );
    }
}

export default BACGraph;
