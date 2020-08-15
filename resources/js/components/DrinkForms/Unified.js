import React, {Component} from 'react';
import {UNITS} from '../data/units';

export default class UnifiedDrinkAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amount: '',
      unit: Object.keys(UNITS)[0],
      percentage: '',
      startTime: new Date(),
      modifyStart: false,
      step: 'origin',
      favoriteId: undefined,
      favoriteList: [],
      beverage_id: undefined,
      beverageList: [],
    };

    this.handlePresetChanged = this.handlePresetChanged.bind(this);
    this.handleNumberChanged = this.handleNumberChanged.bind(this);
    this.handleStartTimeChanged = this.handleStartTimeChanged.bind(this);
    this.handleUnitChanged = this.handleUnitChanged.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handlePresetChanged(event) {
    this.state.beverageList.forEach(function(beverage) {
      if (beverage.id === Number(event.target.value)) {
        this.setState({name: beverage.name, percentage: beverage.percentage, beverage_id: beverage.id});
      }
    }, this);
  }

  handleNumberChanged(event) {
    const input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({[event.target.name]: ''});
    } else {
      this.setState({[event.target.name]: parseFloat(input)});
    }
  }

  handleUnitChanged(event) {
    const unit = event.target.value;
    this.setState({unit: unit});
  }

  handleNameChanged(event) {
    const name = event.target.value;
    this.setState({name: name});
  }

  handleStartTimeChanged(event) {
    const arr = event.target.value.split(/[-T :]/).map((num) => parseInt(num));
    const date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);
    this.setState({startTime: date});
  }

  submitData() {
    this.props.onChange(this.state);
    this.setState({name: '', amount: '', percentage: '', startTime: new Date()});
  }

  render() {
    if (this.state.step === 'origin') {
      return <div>
        <label htmlFor="percentage">Enter the percentage of your drink:</label>
        <div className='row'>
          <div className="col-xs">
            <div className="input-group">
              <input type='number' step='0.01' min='0' onChange={this.handleNumberChanged} value={this.state.percentage} placeholder='Percentage' required className="form-control" name="percentage" />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">%</span>
              </div>
            </div>
          </div>
          <div className="col-xs">
            <button className='btn btn-primary'>Continue</button>
          </div>
        </div>
        <hr />
        <div className="form-group col-md-4">
          <label htmlFor="keyword">Or search for a beverage:</label>
          <input type='text' onChange={this.handleKeywordChanged} value={this.state.keyword} placeholder='Start typing...' required className="form-control" id="keyword" />
          <select onChange={this.handlePresetChanged} value={this.state.beverage_id} className="form-control" id="beverage" required disabled>
            <option>No result</option>
          </select>
          <button className='btn btn-primary'>Continue</button>
          <small className="form-text text-muted"><a href="/beverages/create/">Can't find the beverage you're looking for?</a></small>
        </div>
        <hr />
        <div className="form-group col-md-6">
          <label htmlFor="favorite">Or select from your favorites:</label>
          <select onChange={this.handlePresetChanged} value={this.state.favoriteId} className="form-control" id="favorite" required disabled>
            <option>No result</option>
          </select>
          <button className='btn btn-primary'>Continue</button>
        </div>
        <button type="button" className="btn btn-outline-danger" onClick={this.props.cancel}>Cancel</button>
      </div>;
    }

    const startString = this.state.startTime.getFullYear() + '-' + ('0' + (this.state.startTime.getMonth() + 1)).slice(-2) + '-' + ('0' + this.state.startTime.getDate()).slice(-2) + 'T' + ('0' + this.state.startTime.getHours()).slice(-2) + ':' + ('0' + this.state.startTime.getMinutes()).slice(-2);

    const unitList = Object.keys(UNITS).map((unit) => <option key={unit} value={unit}>{UNITS[unit].name}</option>);

    return (
      <form onSubmit={this.submitData} id='new-drink'>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="percentage">Name</label>
            <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='Name (optional)' className="form-control" name="name" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="percentage">Percentage</label>
            <input type='number' step='0.01' min='0' onChange={this.handleNumberChanged} value={this.state.percentage} placeholder='Percentage' required className="form-control" name="percentage" />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="amount">Amount</label>
            <input type='number' step='0.1' min='0' onChange={this.handleNumberChanged} value={this.state.amount} placeholder='Amount' required className="form-control" name="amount" />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="unit">Unit</label>
            <select onChange={this.handleUnitChanged} value={this.state.unit} className="form-control" id="unit" required>
              {unitList}
            </select>
          </div>
          {this.state.modifyStart && <div className="form-group col-md-6">
            <label htmlFor="startTime">Start time</label>
            <input type="datetime-local" onChange={this.handleStartTimeChanged} value={startString} className="form-control" id="startTime" required />
            <small className="form-text text-muted"><a href="#" onClick={() => this.setState({modifyStart: false})}>Set to the current time</a></small>
          </div>}
          {!this.state.modifyStart && <div className="form-group col-md-6">
            <a href="#" onClick={() => this.setState({modifyStart: true})}>Click here to modify the start time</a>
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
