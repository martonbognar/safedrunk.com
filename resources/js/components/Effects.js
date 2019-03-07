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
            behaviorList.push(<li className="list-group-item" key={index}>{string}</li>);
        });

        let impairmentList = [];
        stage.impairment.forEach(function (string, index) {
            impairmentList.push(<li className="list-group-item" key={index}>{string}</li>);
        });

        return (
            <div id='effects'>
                <ProgressBar percentage={this.props.percentage} />
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Effects
                            </div>
                            <ul className="list-group list-group-flush">
                                {behaviorList}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Impairment
                            </div>
                            <ul className="list-group list-group-flush">
                                {impairmentList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Effects;
