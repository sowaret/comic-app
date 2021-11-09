const { model, Schema } = require('mongoose');
const UserSchema = require('./User');

const refs = {
	Comic: { ref: 'Comic', type: Schema.Types.ObjectId },
	Image: { ref: 'Image', type: Schema.Types.ObjectId },
};

const Filename = String;
const sluggedTitle = { title: String, titleSlug: String };

const models = {
	Comic: model('Comic', {
		...sluggedTitle,
		bannerFilename: Filename,
		description: String,
		emblemName: String,
		nextPageNumber: { type: Number, default: 1 },
	}),
	Image: model('Image', {
		filename: Filename,
		animatedFilename: Filename,
	}),
	Page: model('Page', {
		comic: refs.Comic,
		...sluggedTitle,
		number: Number,
		images: [refs.Image],
		authorComment: String,
		releaseDateTime: Date,
	}),
	SiteConfig: model('SiteConfig', {
		name: String,
		value: String,
	}),
	SocialLink: model('SocialLink', {
		siteName: String,
		siteUrl: String,
		username: String,
	}),
	User: model('User', UserSchema),
};

module.exports = models;
