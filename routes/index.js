const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Future!')
});

module.exports = router;