import { createSlice } from '@reduxjs/toolkit';

export const comicSlice = createSlice({
	name: 'comic',
	initialState: {
		isLoadingComicList: false,
		isLoadingPages: false,
		list: {},
	},
	reducers: {
		setComicList: (state, action) => {
			state.list = action.payload;
		},
		setComicPages: (state, action) => {
			const { titleSlug, pages } = action.payload;
			state.list[titleSlug].pages = pages;
		},
		setIsLoadingComicList: (state, action) => {
			state.isLoadingComicList = action.payload;
		},
		setIsLoadingPages: (state, action) => {
			state.isLoadingPages = action.payload;
		},
	},
});

module.exports = {
	...comicSlice.actions,
	default: comicSlice.reducer,
};
