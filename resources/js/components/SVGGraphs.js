import React, {Component} from 'react';
import {ebacSteps} from './functions';

export default class SVGGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
      labels: [],
      lines: [],
      lineLabels: [],
    };

    this.updateGraph = this.updateGraph.bind(this);
  }

  updateGraph() {
    const data = ebacSteps(this.props.drinks, this.props.userData);
    const keys = [].concat(...data.output.map((obj) => Object.keys(obj)));
    if (data.comeDown.length === 2) {
      keys.push(Object.keys(data.comeDown[1])[0]);
    }
    const regular = [].concat(...data.output.map((obj) => Object.values(obj)));
    const comeDownBase = regular.length > 1 ? Array(regular.length - 1).fill(null) : [];
    const comeDown = comeDownBase.concat(...data.comeDown.map((obj) => Object.values(obj)));

    console.log(keys);
    console.log(regular);
    console.log(comeDown);

    const maxValue = Math.max(...regular.map(parseFloat));

    this.setState({
      circles: keys.map((val, idx) =>
        <circle cx={`${idx * 100 / keys.length + 2}%`} cy={`${100 - (parseFloat(regular[idx]) * 100 / maxValue) + 2}%`} r="2" fill="red" />),
    });

    this.setState({
      labels: keys.map((val, idx) =>
        <text x={`${idx * 100 / keys.length + 2}%`} y='90%'>{val}</text>),
    });

    const lines = [];
    const lineLabels = [];

    for (let i = 0; i <= maxValue + 0.05; i += 0.05) {
      lines.push(<line stroke='black' x1='0' x2='100%' y1={`${100 - (i * 100 / maxValue) + 2}%`} y2={`${100 - (i * 100 / maxValue) + 2}%`} />);
      lineLabels.push(<text x='0' y={`${100 - (i * 100 / maxValue)}%`}>{i}</text>);
    }

    this.setState({
      lines: lines,
      lineLabels: lineLabels,
    });
  }

  componentDidMount() {
    this.updateGraph();
  }

  render() {
    console.log(this.state.circles);
    return (
      <svg width='100%' height="200">
        {this.state.circles}
        {this.state.labels}
        {this.state.lines}
        {this.state.lineLabels}
          Sorry, your browser does not support inline SVG.
      </svg>
    );
  }
};
