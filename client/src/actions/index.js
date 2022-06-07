import axios from 'axios';

export async function getAllRecipes(dispatch) {
        const json = await axios('/recipes', {})
        return dispatch({
            type: 'GET_ALL_RECIPES',
            payload: json.data
        })
}

export function getDetails(id){
    return async function (dispatch) {
        try {
            const json = await axios(`/recipes/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log('hay un error en getDetails' + error);
        }
    }
}

export async function getDiets(dispatch){
        const res = await axios('/types')
        return dispatch({
            type: 'GET_DIETS',
            payload: res.data
        })
    }


export function filterRecipesByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}
export function createRecipe(payload){
    return async function(dispatch){
        await axios.post('/recipes', payload)
    }
}

export function getNameRecipes(name) {
    return async function(dispatch){
        try {
            const json = await axios('/recipes?name=' + name)
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert('No se encontró la receta')
        }
    }
}