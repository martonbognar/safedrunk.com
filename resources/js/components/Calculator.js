import React, { Component } from 'react';
import Effects from './Effects'
import ProgressBar from './ProgressBar'
import './Calculator.css'

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {value: 0};

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
      this.setState({value: 0});
      return;
    }

    let alcohol = 0;
    let period = ((new Date()).getTime() - new Date(this.props.drinks[0].startTime).getTime()) / (1000 * 60 * 60);
    for (let i = 0; i < this.props.drinks.length; i++) {
      let alcoholml = (parseInt(this.props.drinks[i].amount, 10) / 10) * parseInt(this.props.drinks[i].strength, 10);
      let grams = alcoholml * 0.789;
      alcohol += grams;
    }
    this.setState({value: this.ebac(alcohol, period).toFixed(5)});
  }

  ebac(alcohol, period) {
    let bw = this.props.gender === 'male' ? 0.58 : 0.49;
    let result = ((0.806 * (alcohol / 10) * 1.2) / (bw * this.props.weight)) - (0.017 * period);
    return result > 0 ? result : 0;
  }

  render() {
    return (
      <div id='result'>
        <div>
          Alcohol: {this.state.value}%
        </div>
        <ProgressBar percentage={this.state.value} />
        <Effects percentage={this.state.value} />
      </div>
    );
  }
}

export default Calculator;
