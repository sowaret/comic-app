const express = require('express');
const { startSession } = require('mongoose');
const jwtAuthentication = require('../auth');
const comicC = require('../controllers/Comic');
const configC = require('../controllers/SiteConfig');
const pageC = require('../controllers/Page');
const socialLinkC = require('../controllers/SocialLink');
const handleError = require('../errorHandling');
const {
	comicBannerUpload,
	comicPanelUpload,
	createPanelThumbnails,
} = require('../utils/fileUpload');

const comicRouter = express
	.Router()
	.get('/list', async (req, res) => {
		const isAdmin = true;
		const comics = await comicC.getAll(isAdmin);
		const config = await configC.getAll();
		const socialLinks = await socialLinkC.getAll(isAdmin);

		return res.json({ config, comics, socialLinks });
	})
	.get('/pages/:titleSlug', async (req, res) => {
		const comic = await comicC.findOne({ titleSlug: req.params.titleSlug });
		const pages = await pageC.getAll({ comic });
		res.json(pages);
	})
	.post(
		'/create',
		[jwtAuthentication(), comicBannerUpload.single('bannerImage')],
		async (req, res) => {
			const { title, titleSlug, description } = req.body;
			await comicC.create({
				title,
				titleSlug,
				bannerFilename: req.file.filename,
				description,
			});

			res.status(201).end();
		}
	)
	.post(
		'/addPage/:titleSlug',
		[jwtAuthentication(), comicPanelUpload.array('panelFiles')],
		async (req, res) => {
			const session = await startSession();
			session.startTransaction();

			try {
				await createPanelThumbnails({ req });

				const { titleSlug } = req.params;
				const comic = await comicC.findOne({ titleSlug }, session);

				await pageC.create({ req, comic, session });

				await session.commitTransaction();
				res.status(201).json({ nextPageNumber: comic.nextPageNumber });
			} catch (err) {
				await session.abortTransaction();
				handleError(err);
				res.status(500).end();
			} finally {
				session.endSession();
			}
		}
	);

module.exports = comicRouter;
