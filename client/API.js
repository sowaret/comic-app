import axios from 'axios';

const API_URL = process.env.API_URL;

const buildRequest = ({ method, route, data, callbacks, headers }) => {
	const isGet = method === 'get';
	const urlParams =
		isGet && data ? `?${new URLSearchParams(data).toString()}` : '';
	const url = `${API_URL}${route}${urlParams}`;
	const request = isGet
		? axios.get(url)
		: axios[method](url, data, { headers });

	return request;
};

const parseError = err => {
	// Server responded
	if (err.response) return err.response.data;

	// No response, or request error
	const messages = err.request ? ['No response from server'] : [err.message];

	return { messages };
};

const HTTPSend = ({ method = 'get', route, data, callbacks, headers }) =>
	buildRequest({ method, route, data, callbacks, headers })
		.then(res => callbacks.success(res.data))
		.catch(err => callbacks.fail(parseError(err)));

const API = {
	get: (route, data, callbacks) => HTTPSend({ route, data, callbacks }),
	post: (route, data, callbacks, headers) =>
		HTTPSend({ method: 'post', route, data, callbacks, headers }),
};

export default API;
