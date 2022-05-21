const { Recipe } = require('../db.js')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env;


    const getRecipes = async () => {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const recipes = response.data?.results.map(e=>{
            return {
                id: e.id,
                name: e.name,
                title: e.title,
                image: e.image,
                summary: e.summary,
                score: e.spoonacularScore,
                healthScore: e.healthScore,
                diets: e.diets.map(each=>({name: each})),
                dishTypes: e.dishTypes,
                steps: e.analyzedInstructions[0]?.steps.map(each => { return each.step })
            }
        })
        return recipes;
    }


module.exports = {
    getRecipes
}