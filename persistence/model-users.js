const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	zipcode: { type: String, required: true, default: '00000' }
});

userSchema.methods.serialize = function() {
	return {
		id: this._id,
		email: this.email,
		zipcode: this.zipcode
	};
};

const Users = mongoose.model('User', userSchema);

module.exports = Users;``