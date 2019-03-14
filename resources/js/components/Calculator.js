import React, { Component } from 'react';
import Effects from './Effects'
import ProgressBar from './ProgressBar'

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

        let alcohol = 0;

        this.props.drinks.forEach(drink => {
            let alcoholml = (parseInt(drink.amount, 10) / 10) * parseInt(drink.strength, 10);
            let grams = alcoholml * 0.789;
            alcohol += this.ebac(grams, ((new Date()).getTime() - drink.startTime.getTime()) / (1000 * 60 * 60));
        });

        this.setState({ value: alcohol.toFixed(5) });
    }

    ebac(alcohol, period) {
        let bw = this.props.gender === 'male' ? 0.58 : 0.49;
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
