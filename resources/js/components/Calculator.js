import React, { Component } from 'react';
import Effects from './Effects'
import UNITS from './data/units';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = { value: 0 };

        this.ebac = this.ebac.bind(this);
        this.calculateEbac = this.calculateEbac.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.calculateEbac(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    calculateEbac() {
        if (this.props.drinks.length === 0) {
            this.setState({ value: 0 });
            return;
        }

        let period = ((new Date()).getTime() - this.props.drinks[0].startTime.getTime()) / (1000 * 60 * 60);

        let grams = this.props.drinks.map(drink => {
            let amount = UNITS[drink.unit]['multiplier'] * drink.amount;
            let alcoholml = (amount / 10) * drink.percentage;
            return alcoholml * 0.789;
        }).reduce((a, b) => a + b, 0);

        this.setState({ value: this.ebac(grams, period).toFixed(5) });
    }

    ebac(alcohol, period) {
        if (period < 0) {
            return 0;
        }
        let bw = this.props.sex === 'male' ? 0.58 : 0.49;
        let result = ((0.806 * (alcohol / 10) * 1.2) / (bw * this.props.weight)) - (0.017 * period);
        return result > 0 ? result : 0;
    }

    render() {
        return (
            <div id='result'>
                <h2>Blood alcohol content: {this.state.value}%</h2>
                <Effects percentage={this.state.value} />
            </div>
        );
    }
}

export default Calculator;
