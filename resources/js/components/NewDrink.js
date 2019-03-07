import React, { Component } from 'react';

class NewDrink extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            strength: '',
            startTime: new Date(),
            selectedDrink: '',
            beverage_id: undefined,
            drinkList: [],
            customBeverage: true,
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
        this.invalidatePreset = this.invalidatePreset.bind(this);
        this.handleAmountChanged = this.handleAmountChanged.bind(this);
        this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetState() {
        this.setState({ name: '', amount: '', strength: '', startTime: new Date(), selectedDrink: '' });
    }

    refreshStartTime(event) {
        event.preventDefault();
        this.setState({ startTime: new Date() });
    }

    handlePresetChanged(event) {
        this.state.drinkList.forEach(function (drink) {
            if (drink.id === Number(event.target.value)) {
                this.setState({ name: drink.name, strength: drink.percentage, beverage_id: drink.id, selectedDrink: event.target.value, customBeverage: false });
            }
        }, this);
    }

    invalidatePreset() {
        this.setState({ beverage_id: undefined, selectedDrink: '', customBeverage: true });
    }

    handleAmountChanged(event) {
        let input = event.target.value.replace(',', '.');
        if (isNaN(input)) {
            this.setState({ amount: '' });
        } else {
            this.setState({ amount: input });
        }
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
        this.setState({ amount: parseFloat(this.state.amount), strength: parseFloat(this.state.strength) }, this.submitData);
    }

    render() {
        let startTime = new Date(this.state.startTime);
        let startString = startTime.getFullYear() + '-' + ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + startTime.getDate()).slice(-2) + 'T' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

        let drinks = [];

        this.state.drinkList.forEach(function (drink) {
            drinks.push(<option value={drink.id} key={drink.id}>{drink.name}</option>);
        });

        return (
            <form onSubmit={this.handleSubmit} id='new-drink'>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="beverage">Select your beverage</label>
                        <select onChange={this.handlePresetChanged} value={this.state.selectedDrink} className="form-control" id="beverage" required>
                            <option value='' disabled>Choose from a preset</option>
                            {drinks}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="amount">Amount (cl)</label>
                        <input type='number' step='1' min='1' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' required className="form-control" id="amount" />
                    </div>
                </div>
                <div class="btn-group" role="group" aria-label="Form controls">
                    <button type="submit" class="btn btn-outline-success">Submit</button>
                    <button type="button" class="btn btn-outline-danger" onClick={this.props.cancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

export default NewDrink;
