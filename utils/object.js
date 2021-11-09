export const getObjectByPath = (obj, path, separator = '/') =>
	path.split(separator).reduce((prev, curr) => prev && prev[curr], obj);
