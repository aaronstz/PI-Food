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
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Lacto-Vegetarian",
                "Ovo-Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
                "Primal",
                "Low FODMAP",
                "Whole30"
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
    }

module.exports = {
    getTypes
}