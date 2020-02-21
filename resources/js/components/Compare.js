import React, {Component} from 'react';
import BACGraph from './BACGraph';
import {WEIGHTS} from './data/units';

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      session1: 0,
      session2: 0,
      sessionName1: '',
      sessionName2: '',
      drinks1: [],
      drinks2: [],
      basicData: {
        sex: '',
        weight: '',
      },
    };

    const self = this;

    axios.get('/api/personal')
        .then(function(response) {
          self.setState({basicData: {sex: response.data.sex, weight: response.data.weight * WEIGHTS[response.data.weight_unit]}});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });

    axios.get(`/api/sessions`)
        .then(function(response) {
          self.setState({sessions: response.data.map((session) => {
            session.created_at = new Date(session.created_at); return session;
          })});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
    this.loadDrinks = this.loadDrinks.bind(this);
    this.handleSessionChanged = this.handleSessionChanged.bind(this);
  }

  loadDrinks(index, sessionId) {
    const drinksName = 'drinks' + index;
    const sessionName = 'session' + index;
    const self = this;
    axios.get(`/api/sessions/${sessionId}/drinks`)
        .then(function(response) {
          const drinks = response.data.map((drink) => ({
            name: drink.name,
            amount: drink.amount,
            unit: drink.unit,
            percentage: drink.percentage,
            beverage_id: drink.beverage_id,
            startTime: new Date(drink.start),
            key: drink.id,
          }));
          self.setState({
            [drinksName]: drinks,
            [sessionName]: sessionId,
          });
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  handleSessionChanged(event) {
    const sessionId = event.target.value;
    const sessionIndex = `sessionName${event.target.name}`;
    const sessionName = event.target.options[event.target.selectedIndex].text;
    const index = event.target.name;
    this.setState({[sessionIndex]: sessionName}, () => {
      this.loadDrinks(index, sessionId)
      ;
    });
  }

  render() {
    let session1 = null;
    let session2 = null;
    if (this.state.session1 !== 0) {
      session1 = <div><h2>{this.state.sessionName1}</h2><BACGraph drinks={this.state.drinks1} userData={this.state.basicData} /></div>;
    }
    if (this.state.session2 !== 0) {
      session2 = <div><h2>{this.state.sessionName2}</h2><BACGraph drinks={this.state.drinks2} userData={this.state.basicData} /></div>;
    }
    return (
      <div>
        <div>
          <select name='1' onChange={this.handleSessionChanged} value={this.state.session1}>
            <option value='0' disabled>Choose</option>
            {this.state.sessions.map((session) => <option key={session.id} value={session.id}>{session.name}</option>)}
          </select>
          <select name='2' onChange={this.handleSessionChanged} value={this.state.session2}>
            <option value='0' disabled>Choose</option>
            {this.state.sessions.map((session) => <option key={session.id} value={session.id}>{session.name}</option>)}
          </select>
        </div>
        {session1}
        {session2}
      </div>
    );
  }
};
