import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <div>
        <div id='progress-bar'>
          <img alt='Progress bar' src={'/images/progress.png'} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
