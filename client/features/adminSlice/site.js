export const siteState = {
	footerText: '',
};

export const siteReducers = {
	setFooterText: (state, action) => {
		state.site.footerText = action.payload;
	},
};
