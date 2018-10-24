const util = require('./api-util');
const Grills = require('../persistence/model-grills');

const router = require('express').Router();

router.get('/', (req, res) => {
	const grillid = req.query.grillid;

	if(grillid) {
		if(!util.validateId(grillid, res)) return;
		Grills.findById(grillid)
			.then(grill => {
				if(grill)
					res.status(200).json({grill: grill.serialize()});
				else
					res.status(404).end();
			});
	} else {
		Grills.find()
			.then(grills => {
				res.status(200).send(grills.slice(0, 5));
			});
	}
});

module.exports = router;