const initialState = {
    diets: [],
    recipes: [],
    recipesOnPage : [],
    details: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipesOnPage: action.payload
            }

        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }

        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'FILTER_BY_DIET':
            // console.log(action.payload)
            const allDiets = state.recipesOnPage
            const dietsFiltered = action.payload === 'All' ? allDiets : allDiets.filter((r) => {
                    return r.diet.includes(action.payload) || r.diet.map((e) => e.name ).includes(action.payload)
            })
            console.log(action.payload)
            console.log(dietsFiltered)
            return {
                ...state,
                recipes: dietsFiltered
            }
            
        case 'ORDER_BY_NAME':
            const orderName = action.payload === 'Ascendente' ? state.recipesOnPage.sort((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase())})
            : action.payload === 'Descendente' ? state.recipesOnPage.sort((a, b) => {
                return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
            }) :
            action.payload === 'All' ? state.recipes
            : state.recipes
            console.log(orderName)
            return{
                ...state,
                recipesOnPage: orderName
            }
        case 'ORDER_BY_SCORE':
            const orderScore = action.payload === 'All' ? state.recipes : action.payload === 'Ascendente' ? state.recipesOnPage.sort((a, b) => {
                return a.healthScore - b.healthScore})
            : action.payload === 'Descendente' ? state.recipesOnPage.sort((a, b) => {
                return b.healthScore - a.healthScore;
            })
            : state.recipes

            console.log(orderScore)
            return{
                ...state,
                recipesOnPage: orderScore
            }
        

        default: return state
    }
}
