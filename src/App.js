import React, { PureComponent } from 'react';
import './App.css';
import { fetchPackageJson } from './api';
import DependenciesList from './DependenciesList';
import { flatDeps, resolveDeps } from './helpers';


export default class App extends PureComponent {
  state = {
    data: {},
    showResolved: false,
  }

  componentDidMount() {
    fetchPackageJson()
      .then(res => this.setState({ data: res.dependencies }));
  }

  onClickHandler() {
    this.setState((state) => ({
      showResolved: !state.showResolved,
    }));
  }

  render() {
    const { showResolved, data } = this.state;
    const list = showResolved ? resolveDeps(flatDeps(data)) : data;

    return (
      <div>
        <button onClick={() => this.onClickHandler()}>Show resolved deps.</button>
        <DependenciesList list={list} />
      </div>
    );
  }
}
