import React, { Component } from 'react';

class NewDrink extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            percentage: '',
            startTime: new Date(),
            selectedDrink: '',
            beverage_id: undefined,
            beverageList: [],
            customBeverage: true,
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
        this.submitData = this.submitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetState() {
        this.setState({ name: '', amount: '', percentage: '', startTime: new Date(), selectedDrink: '' });
    }

    refreshStartTime(event) {
        event.preventDefault();
        this.setState({ startTime: new Date() });
    }

    handlePresetChanged(event) {
        this.state.beverageList.forEach(function (drink) {
            if (drink.id === Number(event.target.value)) {
                this.setState({ name: drink.name, percentage: drink.percentage, beverage_id: drink.id, selectedDrink: event.target.value, customBeverage: false });
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

    handleKeywordChanged(event) {
        let keyword = event.target.value;
        this.setState({ keyword: keyword });

        if (keyword !== "") {
            let self = this;

            axios.get('/beverages/filter/' + keyword)
                .then(function (response) {
                    self.setState({ beverageList: response.data });
                })
                .catch(function (error) {
                    alert("There was a connection error. Please try reloading the page.");
                });
        } else {
            this.setState({ beverageList: [] });
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
        this.setState({ amount: parseFloat(this.state.amount), percentage: parseFloat(this.state.percentage) }, this.submitData);
    }

    render() {
        let startTime = new Date(this.state.startTime);
        let startString = startTime.getFullYear() + '-' + ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + startTime.getDate()).slice(-2) + 'T' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

        let drinks = [];

        this.state.beverageList.forEach(function (drink) {
            drinks.push(<option value={drink.id} key={drink.id}>{drink.name} ({drink.percentage}%)</option>);
        });

        return (
            <form onSubmit={this.handleSubmit} id='new-drink'>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="keyword">Search for a beverage</label>
                        <input type='text' onChange={this.handleKeywordChanged} value={this.state.keyword} placeholder='Start typing...' required className="form-control" id="keyword" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="beverage">Search results</label>
                        <select onChange={this.handlePresetChanged} value={this.state.selectedDrink} className="form-control" id="beverage" required size='5'>
                            {drinks}
                        </select>
                        <small className="form-text text-muted"><a href="/beverages/create/">Click here</a> to add your own beverages.</small>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="amount">Amount (cl)</label>
                        <input type='number' step='1' min='1' onChange={this.handleAmountChanged} value={this.state.amount} placeholder='Amount (cl)' required className="form-control" id="amount" />
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
