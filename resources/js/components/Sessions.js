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
        this.removeSession = this.removeSession.bind(this);
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

    removeSession(id) {
        let self = this;
        let index = -1;
        this.state.sessions.forEach(function (s, i) {
            if (s.id === id) {
                index = i;
            }
        })
        let temp = this.state.sessions;
        temp.splice(index, 1);
        axios.delete(`/sessions/${id}`)
            .then(function (response) {
                self.setState({ sessions: temp });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    render() {
        let sessions = this.state.sessions.map(function (session) {
            return <li className="list-group-item d-flex justify-content-between align-items-center" key={session.id}><a href={`/sessions/${session.id}`}>{session.name}</a>
                <button type="button" className="btn btn-danger" onClick={() => this.removeSession(session.id)}>Remove</button></li>;
        }, this);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={this.handleNameChanged} value={this.state.name} placeholder='New session' required />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Create</button>
                        </div>
                    </div>
                </form>
                <ul className="list-group">
                    {sessions}
                </ul>
            </div>
        );
    }
}

export default Sessions;
