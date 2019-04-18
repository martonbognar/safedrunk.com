import React, { Component } from 'react';
import intervalToText from './functions';

class Drink extends Component {
    constructor(props) {
        super(props);

        this.state = { timeText: intervalToText(this.props.startTime) }

        this.remove = this.remove.bind(this);
        this.duplicate = this.duplicate.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({ timeText: intervalToText(this.props.startTime) }),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    remove() {
        this.props.onRemove(this);
    }

    duplicate() {
        this.props.onDuplicate(this);
    }

    render() {
        if (this.props.compact) {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center">{this.props.name} ({this.props.percentage}%) · {this.props.amount} {this.props.unit} · {this.state.timeText}
                    <div className="btn-group" role="group" aria-label="Drink controls">
                        <button onClick={this.duplicate} className='btn btn-sm btn-primary'>📋</button>
                        <button onClick={this.remove} className='btn btn-sm btn-danger'>🗑</button>
                    </div>
                </li>
            );
        } else {
            return (
                <div className="col-lg-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.amount} {this.props.unit} · {this.props.percentage}%</h6>
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
}

export default Drink;
