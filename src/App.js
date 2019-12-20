import React, { PureComponent } from 'react';
import './App.css';
import { fetchPackageJson } from './api';
import DependenciesList from './DependenciesList';

const flatDeps = (deps = {}) => {
  return Object.entries(deps)
    .reduce((acc, [k, v]) => {
      if (typeof v !== 'string') {
        return acc.concat(flatDeps(v.dependencies));
      }

      return acc.concat(`${k}@V${v}`);
    }, []);
};

const resolveDeps = (deps = []) => {
  return deps
    .reduce((acc, k) => {
      const [name, version] = k.split('@V');
      const storedVersion = acc[name];

      acc[name] = storedVersion && parseFloat(storedVersion) > parseFloat(version) ? storedVersion : version;

      return acc;
    }, {});
}

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
