import React, { Component } from 'react';

export default class BeverageLookup extends Component {
    constructor() {
        super();

        this.state = {
            searchList: [],
            selected: undefined,
            term: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
    }

    handleSearch(event) {
        let value = event.target.value;
        this.setState({ term: value });

        if (value !== "") {
            let self = this;

            axios.get(`/api/beverages/filter/${value}`)
                .then(function (response) {
                    self.setState({ searchList: response.data });
                    if (response.data.length === 0) {
                        self.updateSelected({ target: { value: undefined } });
                    } else {
                        let beverage = response.data[0];
                        self.updateSelected({ target: { value: beverage.id } });
                    }
                })
                .catch(function (error) {
                    alert("There was a connection error. Please try reloading the page.");
                });
        } else {
            this.setState({ searchList: [] }, this.updateSelected({ target: { value: undefined } }));
        }
    }

    updateSelected(event) {
        let beverage = this.state.searchList.filter((b) => b.id == event.target.value)[0];
        this.setState({ selected: event.target.value }, () => this.props.onBeverageSelect(beverage));
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="name">Beverage name</label>
                    <input type="text" className="form-control" onChange={this.handleSearch} value={this.state.term} name="name" placeholder='Beverage Name' id="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="list">Matching beverages:</label>
                    <select id="list" className="form-control" onChange={this.updateSelected}>
                        {this.state.searchList.map((beverage) => <option key={beverage.id} value={beverage.id}>{beverage.name} ({beverage.percentage})</option>)}
                    </select>
                </div>
            </div>
        );
    }
};