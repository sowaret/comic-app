const ERROR = require('./enums');

const handleError = ([errorEnum, data, err]) => {
	console.error(errorEnum, ':', data);
	err && console.error(err);
};

module.exports = handleError;
