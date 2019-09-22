import React, { Component } from 'react';
import { UNITS } from './data/units';
import BeverageLookup from './BeverageLookup';

class Beverages extends Component {
    constructor() {
        super();

        this.state = {
            beverages: [],
            name: '',
            mixed: false,
            ingredients: [],
            totalAmount: '',
            totalUnit: Object.keys(UNITS)[0],
            percentage: '',
            submit: false,
            searchList: [],
            ingredientUnit: Object.keys(UNITS)[0],
            ingredientAmount: '',
            ingredientId: undefined,
            ingredientName: '',
            ingredientPercentage: 0,
        };

        let self = this;

        axios.get(`/api/beverages/own`)
            .then(function (response) {
                self.setState({ beverages: response.data });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.remove = this.remove.bind(this);
    }

    handleInputChanged(event) {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "percentage") {
            value = value.replace(',', '.');
        }

        this.setState({ [name]: value });

        if (name === "name" && value !== "") {
            let self = this;

            axios.get(`/api/beverages/filter/${value}`)
                .then(function (response) {
                    self.setState({ searchList: response.data });
                })
                .catch(function (error) {
                    alert("There was a connection error. Please try reloading the page.");
                });
        } else {
            this.setState({ searchList: [] });
        }
    }

    handleCheckboxChanged(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.checked
        });
    }

    addIngredient(event) {
        event.preventDefault();
        let ingredients = this.state.ingredients;
        ingredients.push({
            id: this.state.ingredientId,
            name: this.state.ingredientName,
            percentage: this.state.ingredientPercentage,
            amount: this.state.ingredientAmount,
            unit: this.state.ingredientUnit,
            amount_cl: UNITS[this.state.ingredientUnit]['multiplier'] * this.state.ingredientAmount,
        });
        this.setState({ ingredients: ingredients, ingredientAmount: '', ingredientId: undefined, ingredientName: '' });
    }

    handleSubmit(event) {
        event.preventDefault();
        let self = this;
        let beverage = { 'name': this.state.name, 'percentage': this.state.percentage, 'pending': this.state.submit };
        if (this.state.mixed) {
            beverage.mixed = true;
            beverage.total_cl = UNITS[this.state.totalUnit]['multiplier'] * this.state.totalAmount;
            beverage.ingredients = this.state.ingredients;
        }
        axios.post(`/api/beverages`, beverage)
            .then(function (response) {
                beverage.id = response.data.id;
                let beverages = self.state.beverages.concat([beverage]);
                self.setState({ beverages: beverages, name: '', percentage: '', submit: false });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    remove(id) {
        let confirmed = confirm("Are you sure you want to delete this beverage? This will also delete all logged drinks with this beverage.");
        if (!confirmed) {
            return;
        }

        let self = this;
        let index = -1;
        this.state.beverages.forEach(function (s, i) {
            if (s.id === id) {
                index = i;
            }
        })
        let temp = this.state.beverages;
        temp.splice(index, 1);
        axios.delete(`/api/beverages/${id}`)
            .then(function (response) {
                self.setState({ beverages: temp });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    render() {
        let beverages = this.state.beverages.map(function (beverage) {
            return <li className="list-group-item d-flex justify-content-between align-items-center" key={beverage.id}>{beverage.name} ({beverage.percentage}%)
                <button type="button" className="btn btn-danger" onClick={() => this.remove(beverage.id)}>Remove</button></li>;
        }, this);

        let percentage = <div className="form-group">
            <label htmlFor="percentage">Alcohol percentage (%)</label>
            <input type="text" className="form-control" onChange={this.handleInputChanged} value={this.state.percentage} name="percentage" placeholder='Alcohol percentage (%)' id="percentage" required />
        </div>;

        let unitList = Object.keys(UNITS).map((unit) => <option key={unit} value={unit}>{UNITS[unit].name}</option>);

        let ingredientList = this.state.ingredients.map((beverage) => <li key={beverage.id}>{beverage.name} {beverage.amount} {UNITS[beverage.unit]['name']}</li>);

        let mixedForm = <div><form>
            <div class="form-group row">
                <div className="form-group col-md-4">
                    Full drink:
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="amount">Amount</label>
                    <input type='number' step='0.1' min='0' onChange={this.handleInputChanged} value={this.state.totalAmount} placeholder='Amount' required className="form-control" name="totalAmount" />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="unit">Unit</label>
                    <select onChange={this.handleInputChanged} value={this.state.totalUnit} className="form-control" name="totalUnit" required>
                        {unitList}
                    </select>
                </div>
            </div>
            <hr />
            Add new ingredient:
                <BeverageLookup onBeverageSelect={(beverage) => { this.setState((beverage != undefined) ? { ingredientId: beverage.id, ingredientName: beverage.name, ingredientPercentage: beverage.percentage } : { ingredientId: undefined, ingredientName: '', ingredientPercentage: '' }) }} label="Search for an ingredient" />


            <div class="form-group row">
                <div className="form-group col-md-4">
                    Ingredient details:
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="amount">Amount</label>
                    <input type='number' step='0.1' min='0' onChange={this.handleInputChanged} value={this.state.ingredientAmount} placeholder='Ingredient amount' required className="form-control" name="ingredientAmount" />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="unit">Unit</label>
                    <select onChange={this.handleInputChanged} value={this.state.ingredientUnit} className="form-control" name="ingredientUnit" required>
                        {unitList}
                    </select>
                </div>
            </div>


            <button type="submit" onClick={this.addIngredient} className='btn btn-success'>Add ingredient to beverage</button>
        </form>
            <ul>
                {ingredientList}
            </ul>
        </div>;

        return (
            <div>
                <form onSubmit={this.handleSubmit} id="beverage-submit">
                    <div className="form-group">
                        <label htmlFor="name">Beverage name</label>
                        <input type="text" className="form-control" onChange={this.handleInputChanged} value={this.state.name} name="name" placeholder='Beverage Name' id="name" required />
                    </div>
                    {this.state.searchList.length !== 0 && <div className="form-group">
                        <label htmlFor="list">Please make sure the beverage is not present in the database:</label>
                        <select id="list" className="form-control">
                            {this.state.searchList.map((beverage) => <option key={beverage.id}>{beverage.name} ({beverage.percentage})</option>)}
                        </select>
                    </div>}
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="submit" id="submit" checked={this.state.submit} onChange={this.handleCheckboxChanged} />
                            <label className="form-check-label" htmlFor="submit">Submit this beverage to the public database</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="mixed" id="mixed" checked={this.state.mixed} onChange={this.handleCheckboxChanged} />
                            <label className="form-check-label" htmlFor="mixed">Mixed drink (contains multiple alcoholic ingredients)</label>
                        </div>
                    </div>
                    {(!this.state.mixed) && percentage}
                </form>
                {this.state.mixed && mixedForm}
                <button type="submit" className="btn btn-primary" form="beverage-submit">Create beverage</button>
                <hr />
                <ul className="list-group mt-3">
                    {beverages}
                </ul>
            </div>
        );
    }
}

export default Beverages;
