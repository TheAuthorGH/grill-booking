const mongoose = require('mongoose');

const grillSchema = mongoose.Schema({
	model: { type: String, required: true },
	description: { type: String, default: "No description." },
	price: { type: Number, required: true, default: 0 },
	imageurl: { type: String, default: null },
	location: { type: String, required: true }
});

grillSchema.methods.serialize = function() {
	return {
		id: this._id,
		model: this.model,
		description: this.description,
		price: this.price,
		imageurl: this.imageurl
	};
};

const Grills = mongoose.model('Grill', grillSchema);

module.exports = Grills;