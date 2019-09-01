import React, { Component } from 'react';
import BACGraph from './BACGraph';
import { WEIGHTS } from './data/units';

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
        }

        let self = this;

        axios.get('/api/personal')
            .then(function (response) {
                self.setState({ basicData: { sex: response.data.sex, weight: response.data.weight * WEIGHTS[response.data.weight_unit] } });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        axios.get(`/api/sessions`)
            .then(function (response) {
                self.setState({ sessions: response.data.map((session) => { session.created_at = new Date(session.created_at); return session; }) });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
        this.loadDrinks = this.loadDrinks.bind(this);
        this.handleSessionChanged = this.handleSessionChanged.bind(this);
    }

    loadDrinks(index, sessionId) {
        let drinksName = 'drinks' + index;
        let sessionName = 'session' + index;
        let origin = (index == 1) ? this.state.drinks1 : this.state.drinks2;
        let self = this;
        axios.get(`/api/sessions/${sessionId}/drinks`)
            .then(function (response) {
                self.setState({[drinksName]: []}, () => {
                    response.data.forEach(function (drink) {
                        self.setState({
                            [drinksName]: origin.concat([{
                                name: drink.name,
                                amount: drink.amount,
                                unit: drink.unit,
                                percentage: drink.percentage,
                                beverage_id: drink.beverage_id,
                                startTime: new Date(drink.start),
                                key: drink.id,
                            }]),
                            [sessionName]: sessionId,
                        });
                    });
                });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    handleSessionChanged(event) {
        let sessionId = event.target.value;
        let index = event.target.name;
        this.loadDrinks(index, sessionId);
    }

    render() {
        let session1 = null;
        let session2 = null;
        if (this.state.session1 !== 0) {
            session1 = <div><h2>{this.sessionName1}</h2><BACGraph drinks={this.state.drinks1} weight={this.state.basicData.weight} sex={this.state.basicData.sex} /></div>;
        }
        if (this.state.session2 !== 0) {
            session2 = <div><h2>{this.sessionName2}</h2><BACGraph drinks={this.state.drinks2} weight={this.state.basicData.weight} sex={this.state.basicData.sex} /></div>;
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
