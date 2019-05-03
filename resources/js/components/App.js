import React, { Component } from 'react';
import Drink from './Drink'
import Calculator from './Calculator'
import NewDrink from './NewDrink'
import BACGraph from './BACGraph';
import { WEIGHTS } from './data/units';

class App extends Component {
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
                sex: '',
                weight: '',
            },
            drinks: [],
            showNewDrink: false,
            compact: localStorageExists && "true" === localStorage.compact,
        };

        let self = this;

        axios.get('/api/personal')
            .then(function (response) {
                self.setState({ basicData: { sex: response.data.sex, weight: response.data.weight * WEIGHTS[response.data.weight_unit] } });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        axios.get(`/api/sessions/${self.state.id}/drinks`)
            .then(function (response) {
                response.data.forEach(function (drink) {
                    self.setState({
                        drinks: self.state.drinks.concat([{
                            name: drink.beverage.name,
                            amount: drink.amount,
                            unit: drink.unit,
                            percentage: drink.beverage.percentage,
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

        this.submitDrink = this.submitDrink.bind(this);
        this.removeDrink = this.removeDrink.bind(this);
        this.duplicateDrink = this.duplicateDrink.bind(this);
        this.toggleDrinkForm = this.toggleDrinkForm.bind(this);
        this.toggleCompact = this.toggleCompact.bind(this);
    }

    submitDrink(data) {
        let self = this;
        let drink = { 'amount': data.amount, unit: data.unit, 'beverage_id': data.beverage_id };
        if (data.modifyStart) {
            drink.start = Math.floor(data.startTime.getTime() / 1000);
        }
        axios.post(`/api/sessions/${this.state.id}/drinks`, drink)
            .then(function (response) {
                data.key = response.data.id;
                self.setState({ drinks: self.state.drinks.concat([data]) });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
        this.setState({ showNewDrink: false });
    }

    removeDrink(drink) {
        let self = this;
        let index = -1;
        this.state.drinks.forEach(function (d, i) {
            if (d.key === drink.props.id) {
                index = i;
            }
        })
        let tempDrinks = this.state.drinks;
        let id = drink.props.id;
        tempDrinks.splice(index, 1);
        axios.delete(`/api/sessions/${this.state.id}/drinks/${id}`)
            .then(function (response) {
                self.setState({ drinks: tempDrinks });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    duplicateDrink(drink) {
        this.submitDrink({
            name: drink.props.name,
            amount: drink.props.amount,
            unit: drink.props.unit,
            percentage: drink.props.percentage,
            beverage_id: drink.props.beverage_id,
            startTime: new Date(),
        });
    }

    toggleDrinkForm(event) {
        this.setState({ showNewDrink: !this.state.showNewDrink });
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

        let rows = [];

        this.state.drinks.forEach(function (drink) {
            rows.push(
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
                />
            );
        }, this);

        let longSession = this.state.drinks.length > 0 && this.state.drinks[0].startTime.getTime() + (1000 * 60 * 60 * 14) < new Date().getTime();

        let newDrink = this.state.showNewDrink ? <NewDrink onChange={this.submitDrink} cancel={this.toggleDrinkForm} /> : <button className="btn btn-success" onClick={this.toggleDrinkForm}>Add a new drink</button>;

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
}

export default App;
