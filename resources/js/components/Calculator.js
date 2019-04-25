import React, { Component } from 'react';
import { calculateEbac } from './functions';
import Effects from './Effects'
import BACGraph from './BACGraph';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = { value: 0 };
    }

    componentDidMount() {
        let sex = this.props.sex;
        let weight = this.props.weight;
        let drinks = this.props.drinks;

        let self = this;

        this.timerID = setInterval(
            function () {
                let value = calculateEbac(drinks, new Date(), { sex: sex, weight: weight });
                if (value !== self.state.value) {
                    self.setState({ value: value });
                }
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div id='result'>
                <h2>Blood alcohol content: {this.state.value}%</h2>
                <BACGraph drinks={this.props.drinks} weight={this.props.weight} sex={this.props.sex} />
                <Effects percentage={this.state.value} />
            </div>
        );
    }
}

export default Calculator;
