import React, {Component} from 'react';

class BeverageApprove extends Component {
  constructor() {
    super();

    this.state = {
      beverages: [],
    };

    const self = this;

    axios.get(`/api/beverages/pending`)
        .then(function(response) {
          self.setState({beverages: response.data});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });

    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
  }

  handleInputChanged(event) {
    const name = event.target.name;
    const value = event.target.value;

    const beverage_id = this.beverage.id;

    const copy = this.self.state.beverages.slice();

    copy.forEach((beverage) => {
      if (beverage.id === beverage_id) {
        beverage[name] = value;
      }
    });

    this.self.setState({beverages: copy});
  }

  approve(beverage) {
    beverage.approved = true;
    beverage.pending = false;

    const self = this;

    axios.patch(`/api/beverages/${beverage.id}`, beverage)
        .then(function(response) {
          let index = -1;
          self.state.beverages.forEach(function(s, i) {
            if (s.id === beverage.id) {
              index = i;
            }
          });
          const temp = self.state.beverages;
          temp.splice(index, 1);
          self.setState({beverages: temp});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  reject(beverage) {
    beverage.approved = false;
    beverage.pending = false;

    const self = this;

    axios.patch(`/api/beverages/${beverage.id}`, beverage)
        .then(function(response) {
          let index = -1;
          self.state.beverages.forEach(function(s, i) {
            if (s.id === beverage.id) {
              index = i;
            }
          });
          const temp = self.state.beverages;
          temp.splice(index, 1);
          self.setState({beverages: temp});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  render() {
    const beverages = this.state.beverages.map(function(beverage) {
      return <li className="list-group-item d-flex justify-content-between align-items-center" key={beverage.id}><input type='text' name='name' value={beverage.name} onChange={this.handleInputChanged.bind({self: this, beverage: beverage})} />
        <input type='number' name='percentage' value={beverage.percentage} onChange={this.handleInputChanged.bind({self: this, beverage: beverage})} />
        <button type="button" className="btn btn-primary" onClick={() => this.approve(beverage)}>Approve</button><button type="button" className="btn btn-danger" onClick={() => this.reject(beverage)}>Reject</button></li>;
    }, this);
    return (
      <div>
        <ul className="list-group mt-3">
          {beverages}
        </ul>
      </div>
    );
  }
}

export default BeverageApprove;
