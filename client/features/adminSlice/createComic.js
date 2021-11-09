export const createComicState = {
	title: '',
	titleSlug: '',
	bannerImage: { filename: null, src: null },
	description: '',
};

export const createComicReducers = {
	setBannerImage: (state, action) => {
		const { filename, src } = action.payload;
		state.createComic.bannerImage = { filename, src };
	},
};
