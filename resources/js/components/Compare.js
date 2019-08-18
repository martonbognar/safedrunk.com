import React, { Component } from 'react';
import BACGraph from './BACGraph';
import { WEIGHTS } from './data/units';

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
        session1: 1,
        session2: 2,
        drinks1: [],
        drinks2: [],
        basicData: {
            sex: '',
            weight: '',
        },
    }

    let self = this;

    axios.get('/api/personal')
    .then(function (response) {
        self.setState({ basicData: { sex: response.data.sex, weight: response.data.weight * WEIGHTS[response.data.weight_unit] } });
    })
    .catch(function (error) {
        console.error(error);
        alert("There was a connection error. Please try reloading the page.");
    });

    axios.get(`/api/sessions/${self.state.session1}/drinks`)
    .then(function (response) {
        response.data.forEach(function (drink) {
            self.setState({
                drinks1: self.state.drinks1.concat([{
                    name: drink.name,
                    amount: drink.amount,
                    unit: drink.unit,
                    percentage: drink.percentage,
                    beverage_id: drink.beverage_id,
                    startTime: new Date(drink.start),
                    key: drink.id,
                }])
            });
        });
    })
    .catch(function (error) {
        console.error(error);
        alert("There was a connection error. Please try reloading the page.");
    });

    axios.get(`/api/sessions/${self.state.session2}/drinks`)
    .then(function (response) {
        response.data.forEach(function (drink) {
            self.setState({
                drinks2: self.state.drinks2.concat([{
                    name: drink.name,
                    amount: drink.amount,
                    unit: drink.unit,
                    percentage: drink.percentage,
                    beverage_id: drink.beverage_id,
                    startTime: new Date(drink.start),
                    key: drink.id,
                }])
            });
        });
    })
    .catch(function (error) {
        console.error(error);
        alert("There was a connection error. Please try reloading the page.");
    });

  }

  render() {
    return (
        <div>
            <h2>Session 1</h2>
            <BACGraph drinks={this.state.drinks1} weight={this.state.basicData.weight} sex={this.state.basicData.sex} />
            <h2>Session 2</h2>
            <BACGraph drinks={this.state.drinks2} weight={this.state.basicData.weight} sex={this.state.basicData.sex} />
        </div>
    );
  }
};
