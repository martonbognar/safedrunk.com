import React, { Component } from 'react';

class BasicData extends Component {
  constructor(props) {
    super(props);

    this.state = {name: props.name, weight: props.weight, gender: props.gender};
    this.changeName = this.changeName.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeGender(event) {
    this.setState({gender: event.target.value});
  }

  changeWeight(event) {
    let input = event.target.value.replace(',', '.');
    if (isNaN(input)) {
      this.setState({weight: ''});
    } else {
      this.setState({weight: input});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({weight: parseFloat(this.state.weight)}, this.props.onChange(this.state));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Name' required value={this.state.name} onChange={this.changeName} />
        <br />
        <select value={this.state.gender} onChange={this.changeGender}>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select>
        <br />
        <input type='text' placeholder='Weight (kg)' required value={this.state.weight} onChange={this.changeWeight} />
        <br />
        <button className='submit'>Submit</button>
      </form>
    );
  }
}

export default BasicData;
