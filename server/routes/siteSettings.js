const express = require('express');
const jwtAuthentication = require('../auth');
const { SiteConfig } = require('../models');

const allowedNames = ['footerText'];

const siteSettingsRouter = express
	.Router()
	.post('/update', jwtAuthentication(), async (req, res) => {
		const updateRequests = Object.entries(req.body)
			.filter(([name]) => allowedNames.includes(name))
			.map(([name, value]) =>
				SiteConfig.findOneAndUpdate({ name }, { name, value }, { upsert: true })
			);

		await Promise.all(updateRequests);
		res.status(204).end();
	});

module.exports = siteSettingsRouter;
