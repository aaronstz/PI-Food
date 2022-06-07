const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');


router.post('/', async (req, res, next) => {
    try {
        const { name, image, summary, healthScore, instructions, diets } = req.body
        await Recipe.create({
            name, 
            image, 
            summary, 
            healthScore, 
            instructions
        });
        
        const recipe = await Recipe.findOne({where:{name}})
        diets.map(d => recipe.addDiet(d))
        // //agregar dieta a mi receta
        // const dietId = foundId(res.id)

        // const myRecipe = Recipe.findOne({where:{dietId}})
        return res.send({msg: 'Receta creada con éxito'})
    } catch (error) {
        next(error)
        console.log(error)
    }
});

module.exports = router;