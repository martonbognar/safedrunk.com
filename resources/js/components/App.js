import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import NewDrink from './NewDrink'

class App extends Component {
  constructor() {
    super();

    let localStorageExists = typeof (Storage) !== 'undefined';

    this.state = {
      basicData: {
        gender: localStorageExists && localStorage.gender ? localStorage.gender : 'female',
        weight: localStorageExists && localStorage.weight ? localStorage.weight : '',
      },
      drinks: localStorageExists && localStorage.drinks ? JSON.parse(localStorage.drinks) : [],
      exported: localStorageExists,
      keygen: localStorageExists && localStorage.keygen ? localStorage.keygen : 0,
      canSave: localStorageExists,
      showNewDrink: false,
    };

    let self = this;

    axios.get('/personal/')
      .then(function (response) {
        // handle success
        console.log(response);
        self.setState({ basicData: { gender: response.data.sex, weight: response.data.weight } });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.onNewDrinkSubmit = this.onNewDrinkSubmit.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.duplicateDrink = this.duplicateDrink.bind(this);
    this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.saveBasicData = this.saveBasicData.bind(this);
    this.saveDrinks = this.saveDrinks.bind(this);
  }

  onNewDrinkSubmit(data) {
    data.key = this.state.keygen;
    this.setState({ keygen: this.state.keygen + 1 });
    this.setState({ drinks: this.state.drinks.concat([data]) }, this.saveDrinks);
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
      startTime: new Date().getTime(),
    });
  }

  toggleDrinkForm(event) {
    this.setState({ showNewDrink: !this.state.showNewDrink });
  }

  toggleSave() {
    this.setState({ exported: !this.state.exported }, this.saveBasicData);
  }

  saveBasicData() {
    if (this.state.canSave) {
      if (this.state.exported) {
        localStorage.gender = this.state.basicData.gender;
        localStorage.weight = this.state.basicData.weight;
      } else {
        localStorage.removeItem('gender');
        localStorage.removeItem('weight');
      }
    }
  }

  saveDrinks() {
    if (this.state.canSave) {
      localStorage.drinks = JSON.stringify(this.state.drinks);
      localStorage.keygen = this.state.keygen;
    }
  }

  render() {
    let remember = '';
    if (this.state.canSave) {
      remember = (
        <div className='remember'>
          <input type='checkbox' checked={this.state.exported} onChange={this.toggleSave} id='remember-box' />
          <label htmlFor='remember-box'>Remember my data</label>
        </div>
      );
    } else {
      remember = <p>Your browser does not support local storage</p>;
    }

    let rows = [];

    this.state.drinks.forEach(function (drink) {
      rows.push(<Drink key={drink.key} name={drink.name} amount={drink.amount} strength={drink.strength} startTime={drink.startTime} onRemove={this.removeDrink} onDuplicate={this.duplicateDrink} />);
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
