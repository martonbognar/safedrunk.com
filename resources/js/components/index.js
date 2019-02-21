import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

if (document.getElementById('main')) {
  ReactDOM.render(
    <App />,
    document.getElementById('main')
  );
}
