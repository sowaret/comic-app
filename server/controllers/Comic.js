const { Comic } = require('../models');
const handleError = require('../errorHandling');
const pageC = require('./Page');

const comicController = {
	create: fields =>
		Comic(fields)
			.save()
			.catch(err => handleError(['ERROR_CREATING_COMIC', fields, err])),
	findOne: async (filter, opts) => {
		const comic = await Comic.findOne(filter, null, opts).catch(err => {
			throw ['ERROR_FINDING_COMIC', filter, err];
		});
		if (!comic) throw ['COMIC_DOES_NOT_EXIST', filter];

		return comic;
	},
	getAll: async isAdmin => {
		const comicDocs = await Comic.find().catch(err =>
			handleError(['ERROR_GETTING_COMICS', { isAdmin }, err])
		);
		const comicMetadata = Object.fromEntries(
			await Promise.all(comicDocs.map(comic => pageC.toComicMetadata(comic)))
		);

		return comicDocs
			.map(doc => doc.toObject())
			.reduce(
				(obj, { __v, _id, titleSlug, nextPageNumber, ...comic }) => ({
					...obj,
					[titleSlug]: {
						...comic,
						...(isAdmin && { nextPageNumber }),
						...comicMetadata[titleSlug],
					},
				}),
				{}
			);
	},
};

module.exports = comicController;
