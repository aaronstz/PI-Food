const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { Diet } = require('../db.js');

    const getTypes = async () => {
        try {
            const response = await Diet.findAll()
            if(response.length){
                return response;
            }
            const types = [
                "gluten free",
                "ketogenic",
                "vegetarian",
                "lacto ovo vegetarian",
                // "Ovo-Vegetarian",
                "vegan",
                "pescatarian",
                "paleolithic",
                "primal",
                "fodmap friendly",
                "whole 30"
            ];

            types.map(async(e)=>{
                await Diet.findOrCreate({
                    where:{ name: e }
                }); 
            });
            return await Diet.findAll();
            
        } catch (error) {
            console.log(error)
        }
    };

    const getTypesFromDB = (req, res, next) => {
        Diet.findAll()
        .then(d => res.send(d))
        .catch(err => next (err))
        
    };

module.exports = {
    getTypes, 
    getTypesFromDB
}