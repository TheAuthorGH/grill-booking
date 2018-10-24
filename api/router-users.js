const util = require('./api-util');
const jsonParser = require('body-parser').json();
const bcrypt = require('bcryptjs');
const Users = require('../persistence/model-users');

const router = require('express').Router();

router.get('/', (req, res) => {
	const userid = req.query.userid;
	if(!util.validateId(userid, res)) return;

	Users.findById(userid)
		.then(user => {
			if(user)
				res.status(200).json({user: user.serialize()})
			else
				res.status(404).end();
		});
});

router.post('/', jsonParser, (req, res) => {
	if(!util.objHasFields(req.body, ['email', 'password'])) {
		res.status(400).send('Missing user info fields.');
		return;
	}
	if(!req.body.email.includes('@')) {
		res.status(400).send('Invalid email address.');
		return;
	}

	Users.findOne({email: req.body.email})
		.then(user => {
			if(user)
				res.status(400).send(`Email is already in use!`);
			else 
				return bcrypt.hash(req.body.password, 10);
		})
		.then(hash => {
			if(!hash)
				return;
			req.body.password = hash;
			return Users.create(req.body);
		})
		.then(user => {
			if(user)
				res.status(201).json({user: user.serialize()})	
		})
		.catch(err => util.handleApiError(err, res));
});

module.exports = router;