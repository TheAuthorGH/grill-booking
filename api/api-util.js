const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

	handleApiError: function(err, res) {
		console.error(err);
		res.status(500).send('Internal server error!');
	},

	objHasFields: function(obj, fields) {
		if(!obj || !fields)
			return false;
		for(let f of fields) {
			if(obj[f] === undefined)
				return false;
		}
		return true;
	},

	validateId: function(id, res) {
		if(!ObjectId.isValid(id)) {
			res.status(400).json('Invalid id!');
			return false;
		}
		return true;
	}

};