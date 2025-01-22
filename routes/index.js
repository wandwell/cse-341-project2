const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Future!')
});

router.use('/users', require('./users'));

router.use('/pets', require('./pets'));

module.exports = router;