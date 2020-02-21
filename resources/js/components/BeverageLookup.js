import React, {Component} from 'react';

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
    const value = event.target.value;
    this.setState({term: value});

    if (value !== '') {
      const self = this;

      axios.get(`/api/beverages/filter/${value}`)
          .then(function(response) {
            self.setState({searchList: response.data});
            if (response.data.length === 0) {
              self.updateSelected({target: {value: undefined}});
            } else {
              const beverage = response.data[0];
              self.updateSelected({target: {value: beverage.id}});
            }
          })
          .catch(function(error) {
            alert('There was a connection error. Please try reloading the page.');
          });
    } else {
      this.setState({searchList: []}, this.updateSelected({target: {value: undefined}}));
    }
  }

  updateSelected(event) {
    const beverage = this.state.searchList.filter((b) => b.id == event.target.value)[0];
    this.setState({selected: event.target.value}, () => this.props.onBeverageSelect(beverage));
  }

  render() {
    return (
      <div class="form-group row">
        <div className="form-group col-md-6">
          <label htmlFor="name">{this.props.label}</label>
          <input type="text" className="form-control" onChange={this.handleSearch} value={this.state.term} name="name" placeholder={this.props.label} id="name" required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="list">Matching beverages:</label>
          <select id="list" className="form-control" onChange={this.updateSelected}>
            {this.state.searchList.map((beverage) => <option key={beverage.id} value={beverage.id}>{beverage.name} ({beverage.percentage})</option>)}
          </select>
        </div>
      </div>
    );
  }
};
