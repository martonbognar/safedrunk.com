import React, {Component} from 'react';
import Drink from './Drink';
import Calculator from './Calculator';
import DefaultNewDrink from './DrinkForms/Default';
import {WEIGHTS} from './data/units';
import QuickNewDrink from './DrinkForms/Quick';
import SVGGraph from './SVGGraphs';

export default abstract class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicData: {
        sex: "female",
        weight: 0,
        weightUnit: 'kg',
      }
    };

    this.loadState = this.loadState.bind(this);
    this.saveState = this.saveState.bind(this);

    // //////////////////////////////////////////////////////////////////////

    this.submitDrink = this.submitDrink.bind(this);
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.duplicateDrink = this.duplicateDrink.bind(this);
    this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
    this.cancelDrinkForm = this.cancelDrinkForm.bind(this);
    this.basicDataComponent = this.basicDataComponent.bind(this);
    this.longSessionWarning = this.longSessionWarning.bind(this);
    this.addDrinkComponent = this.addDrinkComponent.bind(this);
  }

  componentDidMount() {
    this.loadState();
  }

  abstract loadState(): void;

  abstract saveState(): void;

  abstract storeDrink(): number;

  // //////////////////////////////////////////

  submitDrink(data) {
    if (data.modifyStart) {
      data.start = Math.floor(data.startTime.getTime() / 1000);
    }
    data.key = this.state.keygen;
    this.setState({
      keygen: this.state.keygen + 1,
      showNewDrink: 'none',
      drinks: this.state.drinks.concat([data]),
    }, this.saveDrinks);
  }

  handleValueChanged(event) {
    const name = event.target.name;
    const value = event.target.value;
    const basicData = this.state.basicData;
    basicData[name] = value;
    localStorage[name] = value;
    this.setState({basicData: basicData, basicDataEditing: true});
  }

  handleSave() {
    this.setState({basicDataEditing: false});
  }

  removeDrink(drink) {
    let index = -1;
    this.state.drinks.forEach(function(d, i) {
      if (d.key === drink.id) {
        index = i;
      }
    });
    const tempDrinks = this.state.drinks;
    tempDrinks.splice(index, 1);
    this.setState({drinks: tempDrinks}, this.saveDrinks);
  }

  duplicateDrink(drink) {
    this.submitDrink({
      name: drink.name,
      amount: drink.amount,
      percentage: drink.percentage,
      unit: drink.unit,
      startTime: new Date(),
    });
  }

  toggleDrinkForm(event) {
    this.setState({showNewDrink: event.target.name});
  }

  cancelDrinkForm() {
    this.setState({showNewDrink: 'none'});
  }

  basicDataComponent() {
    return <div>
      <select name="sex" className="form-control" required value={this.state.basicData.sex} onChange={this.handleValueChanged}>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <input type="number" className="form-control" name="weight" required placeholder='Weight' value={this.state.basicData.weight} onChange={this.handleValueChanged} />
      <select name="weightUnit" className="form-control" required value={this.state.basicData.weightUnit} onChange={this.handleValueChanged}>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
        <option value="stone">stone</option>
      </select>
      <button className="btn btn-outline-success" onClick={this.handleSave}>Save</button>
    </div>;
  }

  longSessionWarning() {
    if (this.state.drinks.length === 0) {
      return null;
    }

    let earliest = this.state.drinks[0].startTime.getTime();
    this.state.drinks.forEach((drink) => {
      if (drink.startTime.getTime() < earliest) {
        earliest = drink.startTime.getTime();
      }
    });

    if (earliest + (1000 * 60 * 60 * 14) < new Date().getTime()) {
      return <div className="alert alert-warning" role="alert">
        The first drink in this session was created more than 14 hours ago.
        If you add a new drink now, the calculated blood alcohol level might be
        very inaccurate. If you're starting now, please create another session.
        If you've been drinking for more than 14 hours, it's probably time to
        stop.
      </div>;
    } else {
      return null;
    }
  }

  addDrinkComponent() {
    switch (this.state.showNewDrink) {
      case 'none':
        return <div className="btn-group" role="group" aria-label="Form controls">
          <button name="quick" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Quick add</button>
          <button name="default" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Beverage list</button>
        </div>;
      case 'quick': return <QuickNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />;
      default: return <DefaultNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />;
    }
  }

  render() {
    if (this.state.localStorageExists === false) {
      return localStorageError;
    }

    if (this.state.basicData.weight === 0 || this.state.basicDataEditing) {
      return this.basicDataComponent();
    }

    const drinks = this.state.drinks.map((drink) =>
      <Drink
        key={drink.key}
        id={drink.key}
        name={drink.name}
        amount={drink.amount}
        unit={drink.unit}
        percentage={drink.percentage}
        startTime={drink.startTime}
        onRemove={this.removeDrink}
        beverage_id={drink.beverage_id}
        onDuplicate={this.duplicateDrink}
        temporary={true}
      />,
    );

    const drinkContainer = <ul className="list-group mb-3">{drinks}</ul>;

    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Temporary session
          <div className="form-check form-check-inline mr-0">
            <button className="btn btn-outline-primary ml-2" onClick={() => {
              this.setState({basicDataEditing: true});
            }}>Settings</button>
          </div>
        </div>
        <div className="card-body">
          {this.longSessionWarning()}
          {this.addDrinkComponent()}
          <hr />
          {drinkContainer}
          <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight * WEIGHTS[this.state.basicData.weightUnit]} sex={this.state.basicData.sex} />
          <SVGGraph drinks={this.state.drinks} userData={{weight: this.state.basicData.weight * WEIGHTS[this.state.basicData.weightUnit], sex: this.state.basicData.sex}} />
        </div>
      </div>
    );
  }
};
