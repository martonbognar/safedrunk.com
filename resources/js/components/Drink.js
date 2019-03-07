import React, { Component } from 'react';

class Drink extends Component {
    constructor(props) {
        super(props);

        this.state = { timeText: this.intervalToText(this.props.startTime) }

        this.remove = this.remove.bind(this);
        this.duplicate = this.duplicate.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({ timeText: this.intervalToText(this.props.startTime) }),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    intervalToText(timestamp) {
        let diff = ((new Date()).getTime() - timestamp.getTime()) / 1000;

        if (diff < 10) {
            return 'just now';
        } else if (diff < 60) {
            return parseInt(diff, 10) + ' seconds ago';
        } else if (diff < 120) {
            return 'a minute ago';
        } else if (diff < 60 * 60) {
            return parseInt(diff / 60, 10) + ' minutes ago';
        } else if (diff < 60 * 60 * 2) {
            return 'an hour ago';
        } else if (diff < 60 * 60 * 24) {
            return parseInt(diff / (60 * 60), 10) + ' hours ago';
        } else if (diff < 2 * 60 * 60 * 24) {
            return 'a day ago';
        } else {
            return parseInt(diff / (60 * 60 * 24), 10) + ' days ago';
        }
    }

    remove() {
        this.props.onRemove(this);
    }

    duplicate() {
        this.props.onDuplicate(this);
    }

    render() {
        return (
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.amount} cl · {this.props.strength}%</h6>
                        <p className="card-text">{this.state.timeText}</p>
                        <div className="btn-group" role="group" aria-label="Drink controls">
                            <button onClick={this.duplicate} className='btn btn-sm btn-primary'>Duplicate</button>
                            <button onClick={this.remove} className='btn btn-sm btn-danger'>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Drink;
