const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRecipes } = require('../Controllers/recipes.js');
const { Recipe } = require('../db.js');



router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        const allRecipes = await getRecipes()
        if(name){
            const foundRecipe = allRecipes.filter(r => r.title?.toLowerCase().includes(name.toString().toLowerCase()))
            if(foundRecipe.length) res.status(200).send(foundRecipe)
            else{
                res.status(404).send('No se encontró la receta')
            }
        }
        else{
            res.status(200).send(allRecipes)
        }
    } catch (error) {
        next(error)
    }
});

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    try {
        const foundRecipe = allRecipes.filter(r => r.id === id)
        if(foundRecipe) return res.status(200).send(foundRecipe)
        else{
            return res.status(404).send('No se encontró la receta');
        }
    } catch (error) {
        next(error);
    }
});





module.exports = router;
