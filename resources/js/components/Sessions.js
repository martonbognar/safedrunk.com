import React, { Component } from 'react';

class Sessions extends Component {
    constructor() {
        super();

        this.state = {
            sessions: [],
            name: '',
        };

        let self = this;

        axios.get(`/sessions/`)
            .then(function (response) {
                self.setState({ sessions: response.data });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });

        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChanged(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let self = this;
        axios.post(`/sessions/`, { 'name': this.state.name })
            .then(function (response) {
                let id = response.data.id;
                let sessions = self.state.sessions.concat([{ 'id': id, 'name': self.state.name }]);
                self.setState({ sessions: sessions, name: '' });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    render() {
        let sessions = this.state.sessions.map(function (session) {
            return <li key={session.id}><a href={`/sessions/${session.id}`}>{session.name}</a></li>
        });
        return (
            <div>
                <ul>
                    {sessions}
                </ul>
                <form onSubmit={this.handleSubmit} id='new-session'>
                    <input type='text' onChange={this.handleNameChanged} value={this.state.name} placeholder='New Session Name' required />
                    <button className='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default Sessions;
