import React, {Component} from 'react';
import Drink from './Drink';
import Calculator from './Calculator';
import DefaultNewDrink from './DrinkForms/Default';
import BACGraph from './BACGraph';
import {WEIGHTS} from './data/units';
import QuickNewDrink from './DrinkForms/Quick';
import FavoriteNewDrink from './DrinkForms/Favorite';

export default class App extends Component {
  constructor(props) {
    super(props);

    const localStorageExists = typeof (Storage) !== 'undefined';

    let url = window.location.href;
    if (url.slice(-1) !== '/') {
      url += '/';
    }
    const pieces = url.split('/');

    this.state = {
      id: parseInt(pieces[pieces.length - 2]),
      basicData: {
        sex: '',
        weight: '',
      },
      drinks: [],
      favoriteList: [],
      showNewDrink: 'none',
      compact: localStorageExists && 'true' === localStorage.compact,
    };

    const self = this;

    axios.get('/api/personal')
        .then(function(response) {
          self.setState({basicData: {sex: response.data.sex, weight: response.data.weight * WEIGHTS[response.data.weight_unit]}});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });

    axios.get('/api/favorites')
        .then(function(response) {
          self.setState({favoriteList: response.data});
        })
        .catch(function(error) {
          alert('There was a connection error. Please try reloading the page.');
        });

    axios.get(`/api/sessions/${self.state.id}/drinks`)
        .then(function(response) {
          response.data.forEach(function(drink) {
            self.setState({
              drinks: self.state.drinks.concat([{
                name: drink.name,
                amount: drink.amount,
                unit: drink.unit,
                percentage: drink.percentage,
                beverage_id: drink.beverage_id,
                startTime: new Date(drink.start),
                key: drink.id,
              }]),
            });
          });
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });

    this.submitDrink = this.submitDrink.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.duplicateDrink = this.duplicateDrink.bind(this);
    this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
    this.cancelDrinkForm = this.cancelDrinkForm.bind(this);
    this.toggleCompact = this.toggleCompact.bind(this);
    this.favoriteForDrink = this.favoriteForDrink.bind(this);
  }

  submitDrink(data) {
    const self = this;
    if (data.modifyStart) {
      data.start = Math.floor(data.startTime.getTime() / 1000);
    }
    axios.post(`/api/sessions/${this.state.id}/drinks`, data)
        .then(function(response) {
          data.key = response.data.id;
          self.setState({drinks: self.state.drinks.concat([data])});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
    this.setState({showNewDrink: 'none'});
  }

  removeDrink(drink) {
    const self = this;
    let index = -1;
    // TODO: ?
    this.state.drinks.forEach(function(d, i) {
      if (d.key === drink.id) {
        index = i;
      }
    });
    const tempDrinks = this.state.drinks;
    const id = drink.id;
    tempDrinks.splice(index, 1);
    axios.delete(`/api/sessions/${this.state.id}/drinks/${id}`)
        .then(function(response) {
          self.setState({drinks: tempDrinks});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  duplicateDrink(drink) {
    const self = this;
    axios.post(`/api/sessions/${this.state.id}/drinks/${drink.id}/duplicate`)
        .then(function(response) {
          drink.key = response.data.id;
          drink.id = response.data.id;
          drink.startTime = new Date();
          self.setState({drinks: self.state.drinks.concat([drink])});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
    this.setState({showNewDrink: 'none'});
  }

  toggleDrinkForm(event) {
    this.setState({showNewDrink: event.target.name});
  }

  cancelDrinkForm() {
    this.setState({showNewDrink: 'none'});
  }

  toggleCompact(event) {
    const compact = event.target.checked;
    localStorage.compact = compact;
    this.setState({
      compact: compact,
    });
  }

  favoriteForDrink(drink) {
    let favoriteId = undefined;
    this.state.favoriteList.forEach((favorite) => {
      if (favorite.beverage_id === drink.beverage_id && favorite.amount === drink.amount && favorite.unit === drink.unit) {
        favoriteId = favorite.id;
      }
    });
    return favoriteId;
  }

  render() {
    if (this.state.basicData.sex === null || this.state.basicData.weight === null) {
      return (
        <div>In order to calculate your blood alcohol content, please fill out your <a href="/settings">basic data</a> first.</div>
      );
    }

    const rows = this.state.drinks.map((drink) =>
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
        compact={this.state.compact}
        favoriteId={this.favoriteForDrink(drink)}
      />,
    );

    const longSession = this.state.drinks.length > 0 && this.state.drinks[0].startTime.getTime() + (1000 * 60 * 60 * 14) < new Date().getTime();

    let newDrink = null;

    switch (this.state.showNewDrink) {
      case 'none':
        newDrink =
                    <div className="btn-group" role="group" aria-label="Form controls">
                      <button type="submit" name="quick" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Quick add</button>
                      <button type="button" name="favorite" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Favorites</button>
                      <button type="button" name="default" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Beverage list</button>
                    </div>;
        break;
      case 'quick': newDrink = <QuickNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />; break;
      case 'favorite': newDrink = <FavoriteNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />; break;
      default: newDrink = <DefaultNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />;
    }

    const drinks = this.state.compact ? <ul className="list-group mb-3">{rows}</ul> : <div className="row">{rows}</div>;

    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
                    Session: {this.props.name}
          <div className="form-check form-check-inline mr-0">
            <input className="form-check-input" type="checkbox" id="compact" checked={this.state.compact} onChange={this.toggleCompact} />
            <label className="form-check-label" htmlFor="compact">Compact view</label>
          </div>
        </div>
        <div className="card-body">
          {longSession &&
                        <div className="alert alert-warning" role="alert">
                            The first drink in this session was created more than 14 hours ago. If you add a new drink now, the calculated blood alcohol level might be very inaccurate. If you're starting now, please create another session. If you've been drinking for more than 14 hours, it's probably time to stop.
                        </div>}
          {newDrink}
          <hr />
          {drinks}
          <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} sex={this.state.basicData.sex} />
          <BACGraph drinks={this.state.drinks} userData={this.state.basicData} />
        </div>
      </div>
    );
  }
};
