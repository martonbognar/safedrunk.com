import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className='welcome-div'>
        <h1>Hi!</h1>
        <p>Welcome to BALI, the <a href='https://github.com/martonbognar/bali-react' target='_blank'>open-source</a> Blood Alcohol Level Indicator.</p>
        <p>Please enter your basic information and remember to drink responsibly. Never drink and drive and don't take the estimated figures on this website too seriously.</p>
      </div>
    );
  }
}

export default Welcome;
