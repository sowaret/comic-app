export const authState = {
	token: null,
};

export const authReducers = {
	setToken: (state, action) => {
		state.auth.token = action.payload;
	},
};
