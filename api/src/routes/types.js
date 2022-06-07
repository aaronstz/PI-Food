const { Router } = require('express');
const { getTypes } = require('../Controllers/types.js');
// const { Diet } = require('../db');


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allDiets = await getTypes()
        res.send(allDiets)
    } catch (error) {
        next(error);
    }
})

module.exports = router;