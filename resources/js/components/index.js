import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Beverages from './Beverages';
import BeverageApprove from './BeverageApprove';
import Sessions from './Sessions';
import Statistics from './Statistics';
import Try from './Try';
import Compare from './Compare';

const main = document.getElementById('main');

if (main) {
  ReactDOM.render(
      <App name={main.getAttribute('data-name')} />,
      main
  );
}

if (document.getElementById('session-manager')) {
  ReactDOM.render(
      <Sessions />,
      document.getElementById('session-manager')
  );
}

if (document.getElementById('temporary')) {
  ReactDOM.render(
      <Try />,
      document.getElementById('temporary')
  );
}

if (document.getElementById('beverage-manager')) {
  ReactDOM.render(
      <Beverages />,
      document.getElementById('beverage-manager')
  );
}

if (document.getElementById('beverage-approve')) {
  ReactDOM.render(
      <BeverageApprove />,
      document.getElementById('beverage-approve')
  );
}

if (document.getElementById('statistics')) {
  ReactDOM.render(
      <Statistics />,
      document.getElementById('statistics')
  );
}

if (document.getElementById('compare')) {
  ReactDOM.render(
      <Compare />,
      document.getElementById('compare')
  );
}
