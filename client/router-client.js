const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('pages/index');
});

router.get('/:page', (req, res) => {
	res.render('pages/' + req.params.page);
});

module.exports = router;