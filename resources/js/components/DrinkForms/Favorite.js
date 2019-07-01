import React, { Component } from 'react';
import { UNITS } from '../data/units';

export default class FavoriteNewDrink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: '',
            unit: '',
            percentage: '',
            startTime: new Date(),
            beverage_id: undefined,
            favoriteId: undefined,
            favoriteList: [],
            modifyStart: false,
        };

        let self = this;

        axios.get('/api/favorites')
            .then(function (response) {
                self.setState({ favoriteList: response.data });
                if (response.data.length !== 0) {
                    let favorite = response.data[0];
                    self.setState({ name: favorite.beverage.name, percentage: favorite.beverage.percentage, beverage_id: favorite.beverage.id, favoriteId: favorite.id, unit: favorite.unit, amount: favorite.amount });
                }
            })
            .catch(function (error) {
                alert("There was a connection error. Please try reloading the page.");
            });

        this.handlePresetChanged = this.handlePresetChanged.bind(this);
        this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handlePresetChanged(event) {
        this.state.favoriteList.forEach(function (favorite) {
            if (favorite.id === Number(event.target.value)) {
                this.setState({ name: favorite.beverage.name, percentage: favorite.beverage.percentage, beverage_id: favorite.beverage.id, favoriteId: favorite.id, unit: favorite.unit, amount: favorite.amount });
            }
        }, this);
    }

    handleStartTimeChanged(event) {
        let arr = event.target.value.split(/[-T :]/).map((num) => parseInt(num));
        let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);
        this.setState({ startTime: date });
    }

    submitData() {
        this.props.onChange(this.state);
        this.setState({ startTime: new Date() });
    }

    render() {
        let startString = this.state.startTime.getFullYear() + '-' + ('0' + (this.state.startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + this.state.startTime.getDate()).slice(-2) + 'T' + ('0' + this.state.startTime.getHours()).slice(-2) + ':' + ('0' + this.state.startTime.getMinutes()).slice(-2);

        let favorites = [];

        this.state.favoriteList.forEach(function (favorite) {
            favorites.push(<option value={favorite.id} key={favorite.id}>{favorite.beverage.name} ({favorite.beverage.percentage}%) {favorite.amount} {UNITS[favorite.unit].name}</option>);
        });

        let unitList = Object.keys(UNITS).map((unit) => <option key={unit} value={unit}>{UNITS[unit].name}</option>);

        return (
            <form onSubmit={this.submitData} id='new-drink'>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <select onChange={this.handlePresetChanged} value={this.state.favoriteId} className="form-control" id="favorite" required size='5'>
                            {favorites}
                        </select>
                        <small className="form-text text-muted"><a href="/beverages/create/">Click here</a> to add your own beverages.</small>
                    </div>
                    {this.state.modifyStart && <div className="form-group col-md-6">
                        <label htmlFor="startTime">Start time</label>
                        <input type="datetime-local" onChange={this.handleStartTimeChanged} value={startString} className="form-control" id="startTime" required />
                        <small className="form-text text-muted"><a href="#" onClick={() => this.setState({ modifyStart: false })}>Set to the current time</a></small>
                    </div>}
                    {!this.state.modifyStart && <div className="form-group col-md-6">
                        <a href="#" onClick={() => this.setState({ modifyStart: true })}>Click here to modify the start time</a>
                    </div>}
                </div>
                <div className="btn-group" role="group" aria-label="Form controls">
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                    <button type="button" className="btn btn-outline-danger" onClick={this.props.cancel}>Cancel</button>
                </div>
            </form>
        );
    }
}
