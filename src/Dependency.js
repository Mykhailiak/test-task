import React, { Fragment } from 'react';


const Dependency = ({ hasDeps, List, name, dependencies }) => (
  <li
    className={'dep-item'.concat(hasDeps ? ' has-deps' : '')}
  >
    {hasDeps ? (<Fragment><span>{name}</span> <List list={dependencies}/></Fragment>) : name}
  </li>
);

export default Dependency;

