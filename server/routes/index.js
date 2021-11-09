const express = require('express');
const comicRouter = require('./comic');
const siteSettingsRouter = require('./siteSettings');
const socialLinkRouter = require('./socialLink');
const userRouter = require('./user');

module.exports = express
	.Router()
	.use('/comic', comicRouter)
	.use('/siteSettings', siteSettingsRouter)
	.use('/socialLink', socialLinkRouter)
	.use('/user', userRouter);
