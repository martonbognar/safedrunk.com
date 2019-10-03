import React, {Component} from 'react';
import {calculateEbac} from './functions';
import Effects from './Effects';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {value: 0};
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    this.calculate();
    this.timerID = setInterval(this.calculate, 5000);
  }

  componentDidUpdate() {
    this.calculate();
  }

  calculate() {
    const value = calculateEbac(this.props.drinks, new Date(), {sex: this.props.sex, weight: this.props.weight});
    if (value !== this.state.value) {
      this.setState({value: value});
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
