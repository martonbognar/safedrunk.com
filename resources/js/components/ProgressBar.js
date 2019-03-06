import React, { Component } from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {
    render() {
        let percentage = (0.2 - this.props.percentage) * 500;

        percentage = Math.max(percentage, 0);

        let style = {
            width: percentage + '%',
        }

        return (
            <div>
                <div id='progress-bar'>
                    <img alt='Progress bar' src={'/images/progress.png'} />
                    <div id='progress-cover' style={style}></div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;
