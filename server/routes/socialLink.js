const express = require('express');
const isEqual = require('lodash.isequal');
const jwtAuthentication = require('../auth');
const socialLinkC = require('../controllers/SocialLink');
const { SocialLink } = require('../models');

const mapByIds = array => {
	const mapped = {};
	const unmapped = [];
	array.map(({ _id, ...item }) => {
		if (_id) return (mapped[_id] = item);
		unmapped.push(item);
	});
	return [mapped, unmapped];
};

const socialLinkRouter = express
	.Router()
	.post('/update', jwtAuthentication(), async (req, res) => {
		const isAdmin = true;
		const [currentLinks] = mapByIds(
			(await socialLinkC.getAll(isAdmin)).map(doc => doc.toObject())
		);
		const [existentLinks, newLinks] = mapByIds(req.body);
		const diff = {
			new: newLinks,
			changed: Object.entries(existentLinks).filter(
				([_id, link]) => !isEqual(currentLinks[_id], link)
			),
			deleted: Object.keys(currentLinks).filter(
				linkId => !Object.keys(existentLinks).includes(linkId)
			),
		};

		const socialLinkUpdateRequests = [
			SocialLink.insertMany(diff.new),
			socialLinkC.deleteById(diff.deleted),
			...diff.changed.map(([_id, link]) =>
				SocialLink.findOneAndUpdate({ _id }, link)
			),
		];

		await Promise.all(socialLinkUpdateRequests);
		res.status(201).end();
	});

module.exports = socialLinkRouter;
