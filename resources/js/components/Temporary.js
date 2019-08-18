import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import DefaultNewDrink from './DrinkForms/Default'
import BACGraph from './BACGraph';
import { WEIGHTS } from './data/units';
import QuickNewDrink from './DrinkForms/Quick';

export default class Temporary extends Component {
    constructor(props) {
        super(props);

        let localStorageExists = typeof (Storage) !== 'undefined';

        let url = window.location.href;
        if (url.slice(-1) !== '/') {
            url += "/";
        }
        let pieces = url.split("/");

        this.state = {
            id: parseInt(pieces[pieces.length - 2]),
            basicData: {
                sex: localStorageExists && localStorage.sex ? localStorage.sex : null,
                weight: localStorageExists && localStorage.weight ? localStorage.weight : null,
            },
            drinks: (localStorageExists && localStorage.drinks) ? JSON.parse(localStorage.drinks).map((drink) => {
                drink.startTime = new Date(drink.startTime);
                return drink;
            }) : [],
            showNewDrink: 'none',
            keygen: localStorageExists && localStorage.keygen ? localStorage.keygen : 0,
            compact: localStorageExists && "true" === localStorage.compact,
        };

        this.submitDrink = this.submitDrink.bind(this);
        this.removeDrink = this.removeDrink.bind(this);
        this.duplicateDrink = this.duplicateDrink.bind(this);
        this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
        this.cancelDrinkForm = this.cancelDrinkForm.bind(this);
        this.toggleCompact = this.toggleCompact.bind(this);
        this.saveDrinks = this.saveDrinks.bind(this);
    }

    saveDrinks() {
          localStorage.drinks = JSON.stringify(this.state.drinks);
          localStorage.keygen = this.state.keygen;
      }

    submitDrink(data) {
        if (data.modifyStart) {
            data.start = Math.floor(data.startTime.getTime() / 1000);
        }
        data.key = this.state.keygen;
        this.setState({keygen: this.state.keygen + 1});
        this.setState({drinks: this.state.drinks.concat([data])}, this.saveDrinks);
        this.setState({ showNewDrink: 'none' });
    }

    removeDrink(drink) {
        console.log(this.state.drinks);
        console.log(drink);
        let index = -1;
        this.state.drinks.forEach(function (d, i) {
            if (d.key === drink.props.id) {
                index = i;
            }
        })
        let tempDrinks = this.state.drinks;
        let id = drink.props.id;
        tempDrinks.splice(index, 1);
        this.setState({drinks: tempDrinks}, this.saveDrinks);
    }

    duplicateDrink(drink) {
        this.submitDrink({
            name: drink.name,
            amount: drink.amount,
            percentage: drink.percentage,
            unit: drink.unit,
            startTime: Date.now(),
        });
    }

    toggleDrinkForm(event) {
        this.setState({ showNewDrink: event.target.name });
    }

    cancelDrinkForm() {
        this.setState({ showNewDrink: 'none' });
    }

    toggleCompact(event) {
        let compact = event.target.checked;
        localStorage.compact = compact;
        this.setState({
            compact: compact
        });
    }

    render() {
        if (this.state.basicData.sex === null || this.state.basicData.weight === null) {
            return (
                <div>In order to calculate your blood alcohol content, please fill out your <a href="/settings">basic data</a> first.</div>
            );
        }

        let rows = this.state.drinks.map(drink =>
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
                temporary={true}
            />
        );

        let longSession = this.state.drinks.length > 0 && this.state.drinks[0].startTime.getTime() + (1000 * 60 * 60 * 14) < new Date().getTime();

        let newDrink = null;

        switch (this.state.showNewDrink) {
            case 'none':
                newDrink =
                    <div className="btn-group" role="group" aria-label="Form controls">
                        <button type="submit" name="quick" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Quick add</button>
                        <button type="button" name="default" className="btn btn-outline-primary" onClick={this.toggleDrinkForm}>Beverage list</button>
                    </div>;
                break;
            case 'quick': newDrink = <QuickNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />; break;
            default: newDrink = <DefaultNewDrink onChange={this.submitDrink} cancel={this.cancelDrinkForm} />;
        }

        let drinks = this.state.compact ? <ul className="list-group mb-3">{rows}</ul> : <div className="row">{rows}</div>;

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
                    <BACGraph drinks={this.state.drinks} weight={this.state.basicData.weight} sex={this.state.basicData.sex} />
                </div>
            </div>
        );
    }
};
