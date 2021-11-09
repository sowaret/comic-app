const { Image } = require('../models');

const imageController = {
	createManyFromNewPanelFiles: ({ req, session }) => {
		const newFilenames = {};
		req.files.map(({ originalname, filename }) => {
			newFilenames[originalname] = filename;
		});

		const uploadedFilenames = {};
		const filenameData = JSON.parse(req.body.extraData);
		Object.entries(filenameData).map(([staticFilename, animatedFilename]) => {
			uploadedFilenames[newFilenames[staticFilename]] =
				newFilenames[animatedFilename];
		});

		const imageData = Object.entries(uploadedFilenames).map(
			([filename, animatedFilename]) => ({
				filename,
				animatedFilename,
			})
		);

		return Image.insertMany(imageData, { session }).catch(err => {
			throw ['ERROR_CREATING_IMAGES_FROM_PANEL_FILES', imageData, err];
		});
	},
};

module.exports = imageController;
