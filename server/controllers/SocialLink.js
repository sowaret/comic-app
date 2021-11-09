const { SocialLink } = require('../models');
const handleError = require('../errorHandling');

const socialLinkController = {
	getAll: isAdmin =>
		SocialLink.find()
			.select(['-__v', ...(isAdmin ? '' : ['-_id'])].join(' '))
			.catch(err => handleError(['ERROR_GETTING_SOCIAL_LINKS', null, err])),
	deleteById: idList =>
		SocialLink.deleteMany({ _id: { $in: idList } }).catch(err =>
			handleError(['ERROR_DELETING_SOCIAL_LINKS', idList, err])
		),
};

module.exports = socialLinkController;
