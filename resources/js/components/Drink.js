import React, { Component } from 'react';
import { intervalToText } from './functions';

export default class Drink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeText: intervalToText(this.props.startTime),
        }

        this.remove = this.remove.bind(this);
        this.duplicate = this.duplicate.bind(this);
        this.favorite = this.favorite.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({
                timeText: intervalToText(this.props.startTime),
            }),
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

    favorite() {
        let self = this;
        if (this.props.favoriteId) {
            axios.delete(`/api/favorites/${this.props.favoriteId}`)
                .then(function (response) {
                    self.setState({ favorite_id: undefined });
                })
                .catch(function (error) {
                    console.error(error);
                    alert('There was a connection error. Please try reloading the page.');
                });
        } else {
            axios.post(`/api/favorites`, {
                beverage_id: this.props.beverage_id,
                unit: this.props.unit,
                amount: this.props.amount,
            })
                .then(function (response) {
                    self.setState({ favorite_id: response.data.id });
                })
                .catch(function (error) {
                    console.error(error);
                    alert('There was a connection error. Please try reloading the page.');
                });
        }
    }

    render() {
        if (this.props.compact) {
            return (
                <li className='list-group-item d-flex justify-content-between align-items-center'>{this.props.name} ({this.props.percentage}%) · {this.props.amount} {this.props.unit} · {this.state.timeText}
                    <div className='btn-group' role='group' aria-label='Drink controls'>
                        <button onClick={this.duplicate} className='btn btn-sm btn-primary'>📋</button>
                        <button onClick={this.remove} className='btn btn-sm btn-danger'>🗑</button>
                        <button onClick={this.favorite} className='btn btn-sm btn-success'>{this.props.favoriteId ? '★' : '☆'}</button>
                    </div>
                </li>
            );
        } else {
            return (
                <div className='col-lg-4 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{this.props.name}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>{this.props.amount} {this.props.unit} · {this.props.percentage}%</h6>
                            <p className='card-text'>{this.state.timeText}</p>
                            <div className='btn-group' role='group' aria-label='Drink controls'>
                                <button onClick={this.duplicate} className='btn btn-sm btn-primary'>Duplicate</button>
                                <button onClick={this.remove} className='btn btn-sm btn-danger'>Remove</button>
                                <button onClick={this.favorite} className='btn btn-sm btn-success'>{this.props.favoriteId ? 'Add to Favorites' : 'Remove from Favorites'}</button>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
}
