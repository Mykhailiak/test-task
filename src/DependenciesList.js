import React from 'react';
import Dependency from './Dependency';

const DependenciesList = ({ list }) => (
  <ul>
    {Object.entries(list).map(([key, value]) => {
      const hasDeps = typeof value !== 'string';
      const name = `${key}@${hasDeps ? value.version : value}`;

      return (
        <Dependency
          key={key}
          hasDeps={hasDeps}
          dependencies={value.dependencies}
          name={name}
          List={DependenciesList}
        />
      )
    })}
  </ul>
);

export default DependenciesList;
