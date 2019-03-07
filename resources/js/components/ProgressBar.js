import React, { Component } from 'react';

class ProgressBar extends Component {
    render() {
        let percentage = (0.2 - this.props.percentage) * 500;

        percentage = 100 - Math.max(percentage, 0);

        let style = {
            width: percentage + '%',
        }

        return (
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={style}></div>
            </div>
        );
    }
}

export default ProgressBar;
