const { SiteConfig } = require('../models');
const handleError = require('../errorHandling');

const siteConfigController = {
	getAll: async () =>
		(
			await SiteConfig.find().catch(err =>
				handleError(['ERROR_GETTING_SITE_CONFIGS', null, err])
			)
		).reduce((obj, { name, value }) => ({ ...obj, [name]: value }), {}),
};

module.exports = siteConfigController;
