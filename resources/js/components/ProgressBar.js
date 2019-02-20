import React, { Component } from 'react';
import './ProgressBar.css'

class ProgressBar extends Component {
  render() {
    return (
      <div>
        <div id='progress-bar'>
          <img alt='Progress bar' src={process.env.PUBLIC_URL + '/img/progress.png'} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
