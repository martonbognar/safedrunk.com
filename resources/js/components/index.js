import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Sessions from './Sessions'

if (document.getElementById('main')) {
  ReactDOM.render(
    <App />,
    document.getElementById('main')
  );
}

if (document.getElementById('session-manager')) {
  ReactDOM.render(
    <Sessions />,
    document.getElementById('session-manager')
  );
}
