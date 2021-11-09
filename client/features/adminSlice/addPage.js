export const addPageState = {
	title: '',
	titleSlug: '',
	panels: {},
	authorComment: '',
	releaseDateTime: '',
};

export const addPageReducers = {
	addPanelsFromStaticImages: (state, action) => {
		const existentFileNames = Object.keys(state.addPage.panels);

		const newPanels = { ...state.addPage.panels };
		action.payload.map(file => {
			if (existentFileNames.includes(file.name)) return;
			newPanels[file.filename] = { src: file.src, transcript: '' };
		});

		state.addPage.panels = newPanels;
	},
	addAnimatedVersionToPanel: (state, action) => {
		const { filename, panelFilename, src } = action.payload;
		const { panels } = state.addPage;
		panels[panelFilename] = {
			...panels[panelFilename],
			animatedSrc: src,
			animatedFilename: filename,
		};
	},
};
