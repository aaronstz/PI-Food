const { Recipe, Diet } = require('../db.js')
const axios = require('axios')
require('dotenv').config()
const { API_KEY, API_KEY_DOS, API_KEY_TRES, API_KEY_CUATRO, API_KEY_CINCO, API_KEY_SEIS, API_KEY_SIETE } = process.env;


    const getRecipes = async () => {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_SEIS}&addRecipeInformation=true&number=100`)
        const recipes = response.data?.results.map(e=>{
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                summary: e.summary.replace(/<[^>]*>?/g, ''),
                // score: e.spoonacularScore,
                healthScore: e.healthScore,
                diet: e.diets,
                dishTypes: e.dishTypes,
                steps: e.analyzedInstructions[0]?.steps.map(s => { return s.step })
            }
        })
        return recipes;
    };

    const getDataFromDB = async () => {
        try {
            const dbRecipe = await Recipe.findAll({
                include: {
                    model: Diet,
                    atributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            const findRecipe = dbRecipe.map((e)=>({
                id: e.id,
                image: e.image,
                name: e.name,
                title: e.title,
                diet: e.diets,
                healthScore: e.healthScore,
                summary: e.summary,
                createdInDb: e.createdInDb
            }));
            return findRecipe;
        } catch (error) {
            console.log('hay un errooooooooor GETDATAFROMDB' + error);
        }
    };

    const getAllRecipes = async () => {
        const apiPromise = getRecipes();
        const dbPromise = getDataFromDB();

        const [dbData, apiData] = await Promise.all([dbPromise, apiPromise]);
        return [...dbData, ...apiData ];
    };

    const findByIdApi = async (id) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_SEIS}`)
            const data = response.data
            return {
                id: data.id,
                    title: data.title,  
                    image: data.image,
                    summary: data.summary.replace(/<[^>]*>?/g, ''),
                    // score: data.spoonacularScore,
                    healthScore: data.healthScore,
                    diet: data.diets,
                    steps: data.analyzedInstructions[0]?.steps.map(s => { return s.step.replace(/<[^>]*>?/g, '') })
            }
        } catch (error) {
            console.log('aca hay un errooooooooor findByIdApi' + error);
        }
    }

    const findByIdDB = async (id) => {
        try {
            const idDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    attributes: ["name"],
                    through : {
                        attributes: []
                    },
                }
            });
            return {
                id: id,
                name: idDb.name,
                title: idDb.title,
                summary: idDb.summary,
                image: idDb.image,
                healthScore: idDb.healthScore,
                steps: idDb.steps,
                createdInDb: idDb.createdInDb,
                diet: idDb.diets.map((d)=> d.name)
            }
        } catch (error) {
            console.log('aca hay un errooooooooor findByIdDb ' + error)
        }
    };

    const getRecipesFromDB = (req, res, next) => {
        Recipe.findAll()
        .then(r=>res.send(r))
        .catch(e => next(e))
    }

    const foundId = async (id) => {
        try {
            if(id.includes('-')){
                const db = await findByIdDB(id);
                return db;
            }
            const api = await findByIdApi(id);
            return api
        } catch (error) {
            console.log('aca hay un errooooooooor FOUNDID' + error)
        }
    }
    



module.exports = {
    getRecipes,
    getRecipesFromDB,
    findByIdApi,
    getDataFromDB,
    getAllRecipes,
    findByIdDB,
    foundId
}