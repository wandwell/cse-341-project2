const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags=['Welcome']
    res.send('Welcome to the Future!')
});

router.use('/users', require('./users'));

router.use('/pets', require('./pets'));

module.exports = router;