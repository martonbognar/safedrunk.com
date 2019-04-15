import React, { Component } from 'react';

class Beverages extends Component {
    constructor() {
        super();

        this.state = {
            beverages: [],
            name: '',
            percentage: '',
            submit: false,
            searchList: [],
        };

        let self = this;

        axios.get(`/beverages/own`)
            .then(function (response) {
                self.setState({ beverages: response.data });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
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

            axios.get('/beverages/filter/' + value)
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

    handleSubmit(event) {
        event.preventDefault();
        let self = this;
        let beverage = { 'name': this.state.name, 'percentage': this.state.percentage, 'pending': this.state.submit };

        axios.post(`/beverages`, beverage)
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
        axios.delete(`/beverages/${id}`)
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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                        <label htmlFor="percentage">Alcohol percentage (%)</label>
                        <input type="text" className="form-control" onChange={this.handleInputChanged} value={this.state.percentage} name="percentage" placeholder='Alcohol percentage (%)' id="percentage" required />
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="submit" id="submit" checked={this.state.submit} onChange={this.handleCheckboxChanged} />
                            <label className="form-check-label" htmlFor="submit">Submit this beverage to the public database</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Create beverage</button>
                </form>
                <hr />
                <ul className="list-group mt-3">
                    {beverages}
                </ul>
            </div>
        );
    }
}

export default Beverages;
