import React, { Component } from 'react';
import UNITS from './data/units';


class NewDrink extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            unit: '',
            percentage: '',
            startTime: new Date(),
            beverage_id: undefined,
            beverageList: [],
            submit: false,
            keyword: '',
        };

        this.resetState = this.resetState.bind(this);
        this.refreshStartTime = this.refreshStartTime.bind(this);
        this.handlePresetChanged = this.handlePresetChanged.bind(this);
        this.invalidatePreset = this.invalidatePreset.bind(this);
        this.handleAmountChanged = this.handleAmountChanged.bind(this);
        this.handleKeywordChanged = this.handleKeywordChanged.bind(this);
        this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
        this.handleUnitChanged = this.handleUnitChanged.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetState() {
        this.setState({ name: '', amount: '', unit: '', percentage: '', startTime: new Date(), beverage_id: undefined });
    }

    refreshStartTime(event) {
        event.preventDefault();
        this.setState({ startTime: new Date() });
    }

    handlePresetChanged(event) {
        this.state.beverageList.forEach(function (beverage) {
            if (beverage.id === Number(event.target.value)) {
                this.setState({ name: beverage.name, percentage: beverage.percentage, beverage_id: beverage.id });
            }
        }, this);
    }

    invalidatePreset() {
        this.setState({ beverage_id: undefined });
    }

    handleAmountChanged(event) {
        let input = event.target.value.replace(',', '.');
        if (isNaN(input)) {
            this.setState({ amount: '' });
        } else {
            this.setState({ amount: parseFloat(input) });
        }
    }

    handleKeywordChanged(event) {
        let keyword = event.target.value.trim();
        this.setState({ keyword: keyword });

        if (keyword !== "") {
            let self = this;

            axios.get('/beverages/filter/' + keyword)
                .then(function (response) {
                    self.setState({ beverageList: response.data });
                    if (response.data.length === 0) {
                        self.setState({ beverage_id: undefined });
                    }
                })
                .catch(function (error) {
                    alert("There was a connection error. Please try reloading the page.");
                });
        } else {
            this.setState({ beverageList: [] });
        }
    }

    handleUnitChanged(event) {
        let unit = event.target.value;
        this.setState({ unit: unit });
    }

    handleStartTimeChanged(event) {
        this.setState({ startTime: new Date(event.target.value) });
    }

    submitData() {
        this.props.onChange(this.state);
        this.resetState();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitData();
    }

    render() {
        let startTime = new Date(this.state.startTime);
        let startString = startTime.getFullYear() + '-' + ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + startTime.getDate()).slice(-2) + 'T' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

        let drinks = [];

        this.state.beverageList.forEach(function (drink) {
            drinks.push(<option value={drink.id} key={drink.id}>{drink.name} ({drink.percentage}%)</option>);
        });

        let unitList = Object.keys(UNITS).map((unit) => <option key={unit} value={unit}>{UNITS[unit].name}</option>);

        return (
            <form onSubmit={this.handleSubmit} id='new-drink'>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="keyword">Search for a beverage</label>
                        <input type='text' onChange={this.handleKeywordChanged} value={this.state.keyword} placeholder='Start typing...' required className="form-control" id="keyword" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="beverage">{this.state.beverageList.length} results found:</label>
                        <select onChange={this.handlePresetChanged} value={this.state.beverage_id} className="form-control" id="beverage" required size='5'>
                            {drinks}
                        </select>
                        <small className="form-text text-muted"><a href="/beverages/create/">Click here</a> to add your own beverages.</small>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="amount">Amount</label>
                        <input type='number' step='0.1' min='1' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount' required className="form-control" id="amount" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="unit">Unit</label>
                        <select onChange={this.handleUnitChanged} value={this.state.unit} className="form-control" id="unit" required>
                            {unitList}
                        </select>
                    </div>
                </div>
                <div className="btn-group" role="group" aria-label="Form controls">
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                    <button type="button" className="btn btn-outline-danger" onClick={this.props.cancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

export default NewDrink;
