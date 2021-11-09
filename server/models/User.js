const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');

const UserSchema = Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}).pre('save', async function (next) {
	// Disallow length based on bcrypt truncation
	if (this.password.length > 72)
		throw new Error('PASSWORD_EXCEEDS_LENGTH_LIMIT');

	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

UserSchema.methods.isPasswordValid = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = UserSchema;
