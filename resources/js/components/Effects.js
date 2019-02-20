import React, { Component } from 'react';
import './Effects.css';
import EFFECT_LIST from './data/effectList';

class Effects extends Component {
  constructor(props) {
    super(props);

    this.state = {description: EFFECT_LIST, hideAll: true};
  }

  render() {
    let stage = null;

    this.state.description.forEach(function (obj) {
      if (this.props.percentage >= obj.percentageFloor && this.props.percentage < obj.percentageCeiling) {
        stage = obj;
      }
    }, this);

    if (stage === null) {
      return (<ul></ul>);
    }

    let behaviorList = [];
    stage.behavior.forEach(function (string, index) {
      behaviorList.push(<li key={index}>{string}</li>);
    });

    let impairmentList = [];
    stage.impairment.forEach(function (string, index) {
      impairmentList.push(<li key={index}>{string}</li>);
    });

    return (
      <div id='effects'>
        <div id='behavior'>
          <h3>Effects</h3>
          <ul>
            {behaviorList}
          </ul>
        </div>
        <div id='impairment'>
          <h3>Impairment</h3>
          <ul>
            {impairmentList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Effects;
