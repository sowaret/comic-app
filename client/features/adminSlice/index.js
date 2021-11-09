import { createSlice } from '@reduxjs/toolkit';
import { getObjectByPath } from '../../../utils/object';
import { addPageReducers, addPageState } from './addPage';
import { authReducers, authState } from './auth';
import { createComicReducers, createComicState } from './createComic';
import { siteReducers, siteState } from './site';
import { socialLinksReducers, socialLinksState } from './socialLinks';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		addPage: addPageState,
		auth: authState,
		createComic: createComicState,
		site: siteState,
		socialLinks: socialLinksState,
	},
	reducers: {
		...addPageReducers,
		...authReducers,
		...createComicReducers,
		...siteReducers,
		...socialLinksReducers,
		setInput: (state, action) => {
			const { path, value, append } = action.payload;
			const [statePath, key] = path.split(/\/(?=[^\/]+$)/); // Split at last `/`
			const objPath = getObjectByPath(state, statePath);
			objPath[key] = append ? objPath[key] + append : value;
		},
	},
});

module.exports = {
	...adminSlice.actions,
	default: adminSlice.reducer,
};
