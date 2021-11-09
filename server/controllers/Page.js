const { Page } = require('../models');
const imageC = require('./Image');

const formatDate = date =>
	date && [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');

const getAllPages = ({ comic, populateImages = false, sort }) => {
	const query = Page.find({ comic }).select('-__v -_id -comic');
	if (sort) query.sort(sort);
	if (populateImages) query.populate('images', '-__v -_id');
	return query.exec().catch(err => {
		throw ['ERROR_GETTING_COMIC_PAGES', { comic, populateImages, sort }, err];
	});
};

const pageController = {
	create: async ({ req, comic, session }) => {
		const page = Page({
			comic,
			number: comic.nextPageNumber,
			images: await imageC.createManyFromNewPanelFiles({ req, session }),
			...req.body,
		});

		await page.save({ session }).catch(err => {
			throw ['ERROR_SAVING_PAGE', page, err];
		});

		comic.nextPageNumber++;
		await comic.save({ session }).catch(err => {
			throw ['ERROR_UPDATING_COMIC_NEXT_PAGE_NUMBER', comic, err];
		});
	},
	getAll: async ({ comic }) =>
		(await getAllPages({ comic, populateImages: true }))
			.map(page => page.toObject())
			.map(({ releaseDateTime, ...page }) => ({
				...page,
				releaseDate: formatDate(releaseDateTime),
			})),
	// Retrieve comic page count and release date of latest page
	toComicMetadata: async comic => {
		const pages = await getAllPages({ comic, sort: { number: -1 } });
		return [
			comic.titleSlug,
			{
				pageCount: pages.length,
				lastUpdateDate: formatDate(pages[0]?.toObject().releaseDateTime),
			},
		];
	},
};

module.exports = pageController;
