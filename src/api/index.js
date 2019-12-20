const URL = '/complex-package.json';

export const fetchPackageJson = () => fetch(URL).then(r => r.json());
