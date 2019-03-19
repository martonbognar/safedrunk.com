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
                sex: '',
                weight: '',
            },
            drinks: [],
            showNewDrink: false,
        };

        let self = this;

        axios.get('/personal/')
            .then(function (response) {
                self.setState({ basicData: { sex: response.data.sex, weight: response.data.weight } });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        axios.get(`/sessions/${self.state.id}/drinks`)
            .then(function (response) {
                response.data.forEach(function (drink) {
                    self.setState({
                        drinks: self.state.drinks.concat([{
                            name: drink.beverage.name,
                            amount: drink.amount,
                            unit: drink.unit,
                            percentage: drink.beverage.percentage,
                            beverage_id: drink.beverage_id,
                            startTime: new Date(drink.start + "Z"),
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
    }

    submitDrink(data) {
        let self = this;
        axios.post(`/sessions/${this.state.id}/drinks`, { 'amount': data.amount, unit: data.unit, 'beverage_id': data.beverage_id })
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
        axios.delete(`/sessions/${this.state.id}/drinks/${id}`)
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

    render() {
        if (this.state.basicData.sex === null || this.state.basicData.weight === null) {
            return (
                <div>In order to calculate your blood alcohol content, please fill out your <a href="/modify">basic data</a> first.</div>
            );
        }

        let rows = [];

        this.state.drinks.forEach(function (drink) {
            rows.push(<Drink key={drink.key} id={drink.key} name={drink.name} amount={drink.amount} unit={drink.unit} percentage={drink.percentage} startTime={drink.startTime} onRemove={this.removeDrink} beverage_id={drink.beverage_id} onDuplicate={this.duplicateDrink} />);
        }, this);

        let newDrink = this.state.showNewDrink ? <NewDrink onChange={this.submitDrink} cancel={this.toggleDrinkForm} /> : <button className="btn btn-success" onClick={this.toggleDrinkForm}>Add a new drink</button>;

        let content = '';

        if (this.state.basicData.weight !== 0 && this.state.basicData.weight !== '') {
            content = (
                <div>
                    {newDrink}
                    <hr />
                    <div className="row">
                        {rows}
                    </div>
                    <Calculator drinks={this.state.drinks} weight={this.state.basicData.weight} sex={this.state.basicData.sex} />
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
