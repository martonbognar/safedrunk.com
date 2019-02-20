import React, { Component } from 'react';

class AdSense extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins className="adsbygoogle"
        style={{'display': 'block'}}
        data-ad-client="ca-pub-5210002685428807"
        data-ad-slot="9432257777"
        data-ad-format="auto">
      </ins>
    );
  }
}

export default AdSense;
