import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import NewDrink from './NewDrink'

class App extends Component {
  constructor() {
    super();

    let url = window.location.href;
    if (url.slice(-1) !== '/') {
      url += "/";
    }
    let pieces = url.split("/");

    this.state = {
      id: pieces[pieces.length - 2],
      basicData: {
        gender: '',
        weight: '',
      },
      drinks: [],
      showNewDrink: false,
    };

    let self = this;

    axios.get('/personal/')
      .then(function (response) {
        self.setState({ basicData: { gender: response.data.sex, weight: response.data.weight } });
      })
      .catch(function (error) {
        console.log(error);
        alert("There was a connection error. Please try reloading the page.");
      });

    axios.get(`/sessions/${self.state.id}/drinks/`)
      .then(function (response) {
        response.data.forEach(function (drink) {
          self.setState({
            drinks: self.state.drinks.concat([{
              name: drink.beverage.name,
              amount: drink.amount_cl,
              strength: drink.beverage.percentage,
              beverage_id: drink.beverage_id,
              startTime: new Date(drink.start),
              key: drink.id,
            }])
          });
        });
      })
      .catch(function (error) {
        console.log(error);
        alert("There was a connection error. Please try reloading the page.");
      });

    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.duplicateDrink = this.duplicateDrink.bind(this);
    this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
  }

  onNewDrinkSubmit(data) {
    this.setState({ drinks: this.state.drinks.concat([data]) });
    axios.post(`/sessions/${this.state.id}/drinks/`, { 'amount_cl': data.amount, 'beverage_id': data.beverage_id })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        alert("There was a connection error. Please try reloading the page.");
      });
    this.setState({ showNewDrink: false });
  }

  removeDrink(drink) {
    let tempDrinks = this.state.drinks;
    let index = tempDrinks.indexOf(drink);
    tempDrinks.splice(index, 1);
    this.setState({ drinks: tempDrinks }, this.saveDrinks);
  }

  duplicateDrink(drink) {
    this.onNewDrinkSubmit({
      name: drink.props.name,
      amount: drink.props.amount,
      strength: drink.props.strength,
      beverage_id: drink.props.beverage_id,
      startTime: new Date().getTime(),
    });
  }

  toggleDrinkForm(event) {
    this.setState({ showNewDrink: !this.state.showNewDrink });
  }

  render() {
    let rows = [];

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} onRemove={this.removeDrink} beverage_id={drink.beverage_id} onDuplicate={this.duplicateDrink} />);
    }, this);

    let newDrink = this.state.showNewDrink ? <div id='drink-form'><NewDrink onChange={this.onNewDrinkSubmit} /><button onClick={this.toggleDrinkForm} className='remove'>Cancel</button></div> : <button onClick={this.toggleDrinkForm}>New Drink</button>;

    let content = '';

    if (this.state.basicData.weight !== 0 && this.state.basicData.weight !== '') {
      content = (
        <div>
          {newDrink}
          <div id='drinks'>
            {rows}
          </div>
          <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} gender={this.state.basicData.gender} />
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
