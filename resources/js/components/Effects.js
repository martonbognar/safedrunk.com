import React, { Component } from 'react';
import EFFECT_LIST from './data/effectList';
import ProgressBar from './ProgressBar';

class Effects extends Component {
    render() {
        let stage = null;

        EFFECT_LIST.forEach(function (obj) {
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
                <ProgressBar percentage={this.props.percentage} />
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
