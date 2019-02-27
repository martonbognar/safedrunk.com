import React, { Component } from 'react';

class NewDrink extends Component {


  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amount: '',
      strength: '',
      startTime: new Date().getTime(),
      selectedDrink: '',
      beverage_id: undefined,
      drinkList: [],
      store: false,
      submit: false,
    };

    let self = this;

    axios.get('/beverages/')
      .then(function (response) {
        self.setState({ drinkList: response.data });
      })
      .catch(function (error) {
        alert("There was a connection error. Please try reloading the page.");
      });

    this.resetState = this.resetState.bind(this);
    this.refreshStartTime = this.refreshStartTime.bind(this);
    this.handlePresetChanged = this.handlePresetChanged.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
    this.handleStrengthChanged = this.handleStrengthChanged.bind(this);
    this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.setState({ name: '', amount: '', strength: '', startTime: new Date().getTime(), selectedDrink: '' });
  }

  refreshStartTime(event) {
    event.preventDefault();
    this.setState({ startTime: new Date().getTime() });
  }

  handlePresetChanged(event) {
    this.state.drinkList.forEach(function (drink) {
      console.log(`${drink.id} - ${event.target.value}`);
      if (drink.id === Number(event.target.value)) {
        this.setState({ name: drink.name, strength: drink.percentage, beverage_id: drink.id });
      }
    }, this);
    this.setState({ selectedDrink: event.target.value });
  }

  handleNameChanged(event) {
    this.setState({ name: event.target.value });
  }

  handleAmountChanged(event) {
    let input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({ amount: '' });
    } else {
      this.setState({ amount: input });
    }
  }

  handleCheckboxChanged(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.checked
    });
  }

  handleStrengthChanged(event) {
    let input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({ strength: '' });
    } else {
      this.setState({ strength: input });
    }
  }

  handleStartTimeChanged(event) {
    this.setState({ startTime: new Date(event.target.value).getTime() });
  }

  submitData() {
    this.props.onChange(this.state);
    this.resetState();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ amount: parseFloat(this.state.amount), strength: parseFloat(this.state.strength) }, this.submitData);
  }

  render() {
    let startTime = new Date(this.state.startTime);
    let startString = startTime.getFullYear() + '-' + ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + startTime.getDate()).slice(-2) + 'T' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

    let drinks = [];

    this.state.drinkList.forEach(function (drink) {
      drinks.push(<option value={drink.id} key={drink.id}>{drink.name}</option>);
    });

    let submitBeverage = null;

    if (this.state.store) {
      submitBeverage = <div><input
        name="submit"
        id="submit"
        type="checkbox"
        checked={this.state.submit}
        onChange={this.handleCheckboxChanged} />
        <label htmlFor="submit">Submit this beverage to the public database</label></div>;
    }

    return (
      <form onSubmit={this.handleSubmit} id='new-drink'>
        <select onChange={this.handlePresetChanged} value={this.state.selectedDrink}>
          <option value='' disabled>Choose from a preset</option>
          {drinks}
        </select>
        <br />
        Or define your own:
        <br />
        <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='Drink Name' required />
        <br />
        <input type='text' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' required />
        <br />
        <input type='text' onChange={this.handleStrengthChanged} value={this.state.strength} placeholder='Strength (%)' required />
        <br />
        <input type='datetime-local' onChange={this.handleStartTimeChanged} required value={startString} />
        <br />
        <a href='#' onClick={this.refreshStartTime}>Set to now</a>
        <br />
        <input
          name="store"
          id="store"
          type="checkbox"
          checked={this.state.store}
          onChange={this.handleCheckboxChanged} />
        <label htmlFor="store">Store this beverage for later use</label>
        {submitBeverage}
        <br />
        <button className='submit'>Submit</button>
      </form>
    );
  }
}

export default NewDrink;
