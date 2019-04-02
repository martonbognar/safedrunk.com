import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Beverages from './Beverages'
import Sessions from './Sessions'
import Statistics from './Statistics'

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

if (document.getElementById('beverage-manager')) {
    ReactDOM.render(
        <Beverages />,
        document.getElementById('beverage-manager')
    );
}

if (document.getElementById('statistics')) {
    ReactDOM.render(
        <Statistics />,
        document.getElementById('statistics')
    );
}
