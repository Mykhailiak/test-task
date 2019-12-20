export const flatDeps = (deps = {}) => {
  return Object.entries(deps)
    .reduce((acc, [k, v]) => {
      if (typeof v !== 'string') {
        return acc.concat(flatDeps(v.dependencies));
      }

      return acc.concat(`${k}@V${v}`);
    }, []);
};

export const resolveDeps = (deps = []) => {
  return deps
    .reduce((acc, k) => {
      const [name, version] = k.split('@V');
      const computedVersion = version.replace(/\./g, '')
      const storedVersion = /(\d\.?)+/.exec(acc[name] || '0.0.0')[0].replace(/\./g, '');

      acc[name] = storedVersion && (parseFloat(storedVersion) > parseFloat(computedVersion)) ? storedVersion : version;

      return acc;
    }, {});
};
