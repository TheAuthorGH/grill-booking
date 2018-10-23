const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.methods.serialize = function() {
	return {
		id: this._id,
		email: this.email
	};
};

const Users = mongoose.model('User', userSchema);

module.exports = Users;