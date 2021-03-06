import React, {Component} from 'react';
import {intervalToText} from './functions';

class Sessions extends Component {
  constructor() {
    super();

    this.state = {
      sessions: [],
      name: '',
    };

    const self = this;

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

    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeSession = this.removeSession.bind(this);
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    axios.post(`/api/sessions`, {'name': this.state.name})
        .then(function(response) {
          const id = response.data.id;
          const sessions = [{'id': id, 'name': self.state.name, 'created_at': new Date()}].concat(self.state.sessions);
          self.setState({sessions: sessions, name: ''});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  removeSession(id) {
    const confirmed = confirm('Are you sure you want to delete this session? This will also delete all logged drinks for this session.');
    if (!confirmed) {
      return;
    }

    const self = this;
    let index = -1;
    this.state.sessions.forEach(function(s, i) {
      if (s.id === id) {
        index = i;
      }
    });
    const temp = this.state.sessions;
    temp.splice(index, 1);
    axios.delete(`/api/sessions/${id}`)
        .then(function(response) {
          self.setState({sessions: temp});
        })
        .catch(function(error) {
          console.error(error);
          alert('There was a connection error. Please try reloading the page.');
        });
  }

  render() {
    const sessions = this.state.sessions.map(function(session) {
      return <li className="list-group-item d-flex justify-content-between align-items-center" key={session.id}><a href={`/sessions/${session.id}`}>{session.name} ({intervalToText(session.created_at)})</a>
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
        <hr />
        <ul className="list-group">
          {sessions}
        </ul>
      </div>
    );
  }
}

export default Sessions;
