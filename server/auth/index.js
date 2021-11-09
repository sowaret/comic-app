const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(
	'register',
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.create({ username, password });
			return done(null, user);
		} catch (err) {
			done(err);
		}
	})
);

passport.use(
	'login',
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) return done('USER_NOT_FOUND', false);

			if (!(await user.isPasswordValid(password)))
				return done('PASSWORD_IS_INCORRECT', false);

			return done(null, user, { message: 'Success' });
		} catch (err) {
			return done(err);
		}
	})
);

passport.use(
	new JWTStrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		(token, done) => {
			try {
				return done(null, token.user);
			} catch (err) {
				done(err);
			}
		}
	)
);

module.exports = () => passport.authenticate('jwt', { session: false });
