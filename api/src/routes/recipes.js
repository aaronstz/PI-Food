const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getAllRecipes, foundId, getRecipes } = require('../Controllers/recipes.js');
const { Recipe, Diet } = require('../db.js');



router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        const allRecipes = await getAllRecipes()
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
        console.log(allRecipes)
    } catch (error) {
        next(error)
    }
});

router.get('/:idRecipe', async (req, res, next) => {
    try {
        const id = req.params.idRecipe;
        // const allRecipes = await getRecipes()
        const foundRecipe = await foundId(id)
        console.log(foundRecipe)
        if(foundRecipe) return res.status(200).send(foundRecipe)
        else{
            return res.status(404).send('No se encontró la receta');
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title, image, summary, healthScore, steps, diet } = req.body
        await Recipe.create({
            title, 
            image, 
            summary, 
            healthScore, 
            steps
        });
        
        const recipe = await Recipe.findOne({where:{title}})
        
        diet.map(d => recipe.addDiet(d)) 

        // const myRecipe = Recipe.findOne({where:{dietId}})
        return res.send({msg: 'Receta creada con éxito'})
    } catch (error) {
        next(error)
        console.log(error)
    }
});




module.exports = router;
