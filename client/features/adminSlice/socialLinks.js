export const socialLinksState = {
	// Admin's `changes` - do not populate by default
	list: [],
};

export const socialLinksReducers = {
	appendNewLink: state => {
		state.socialLinks.list = [
			...state.socialLinks.list,
			{ siteName: '', siteUrl: '', username: '' },
		];
	},
	setSocialLinks: (state, action) => {
		state.socialLinks.list = action.payload;
	},
};
