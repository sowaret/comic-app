const { randomBytes } = require('crypto');
const multer = require('multer');
const { extname } = require('path');
const sharp = require('sharp');

const COMIC_PANEL_BASE = 'media/comic-panel/';

const generateFilename = (req, file, cb) =>
	cb(null, randomBytes(16).toString('hex') + extname(file.originalname));

const uploadTo = destination =>
	multer({
		storage: multer.diskStorage({
			destination,
			filename: generateFilename,
		}),
	});

const createPanelThumbnails = async ({ req }) => {
	const { filename } = req.files[0];
	await sharp(COMIC_PANEL_BASE + filename)
		.resize({ height: 130, width: 100, position: 'top' })
		.toFile(COMIC_PANEL_BASE + 'thumb/' + filename);
};

module.exports = {
	comicBannerUpload: uploadTo('media/comic-banner/'),
	comicPanelUpload: uploadTo(COMIC_PANEL_BASE),
	createPanelThumbnails,
};
