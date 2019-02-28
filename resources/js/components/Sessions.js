import React, { Component } from 'react';

class Sessions extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        };

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
                self.setState({ name: '' });
            })
            .catch(function (error) {
                console.error(error);
                alert("There was a connection error. Please try reloading the page.");
            });
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Session</li>
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
