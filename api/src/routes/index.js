const { Router } = require('express');
// const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const routeRecipes = require('./recipes.js');
const routeTypes = require('./types.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', routeRecipes);
router.use('/types', routeTypes);


module.exports = router;
