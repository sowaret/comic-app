const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../auth');

const userRouter = express
	.Router()
	.post(
		'/register',
		passport.authenticate('register', { session: false }),
		({ user }, res) => res.status(201).json({ user })
	)
	.post('/login', (req, res, next) => {
		passport.authenticate('login', (err, user) => {
			try {
				if (err || !user) return next(new Error(err));

				req.login(user, { session: false }, err => {
					if (err) return next(err);

					const body = { _id: user._id, username: user.username };
					const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

					return res.json({ token });
				});
			} catch (err) {
				return next(err);
			}
		})(req, res, next);
	});

module.exports = userRouter;
