export const flatDeps = (deps = {}) => {
  return Object.entries(deps)
    .reduce((acc, [k, v]) => {
      if (typeof v !== 'string') {
        return acc.concat(flatDeps(v.dependencies));
      }

      return acc.concat(`${k}@V${v}`);
    }, []);
};

const computeVersion = (version) => {
  return version.replace(/[.^#]/g, '');
};

export const resolveDeps = (deps = []) => {
  return deps
    .reduce((acc, k) => {
      const [name, version] = k.split('@V');
      const storedVersion = acc[name] || '0.0.0';

      acc[name] = storedVersion && parseFloat(computeVersion(storedVersion)) > parseFloat(computeVersion(version)) ? storedVersion : version;

      return acc;
    }, {});
};
