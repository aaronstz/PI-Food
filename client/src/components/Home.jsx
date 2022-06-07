import { getAllRecipes, getDiets, filterRecipesByDiet, orderByName, orderByScore } from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom';
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import s from './styles/Bar.module.css';


export default function Home(){
    const dispatch = useDispatch()
    let recipes = useSelector(store => store.recipes)
    const recipesOnPage = useSelector(store => store.recipesOnPage)
    const diets = useSelector(store => store.diets)
    let recipeType = [...recipes]
    const [refresh, setRefresh] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = recipeType.slice(indexOfFirstRecipe, indexOfLastRecipe)

    // console.log(currentRecipes)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() =>{
        getAllRecipes(dispatch);
        getDiets(dispatch);
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        getAllRecipes(dispatch)
    }

    function orderAlf(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderByName(e.target.value));

    }
    
    function orderScore(e){
        e.preventDefault()
        setRefresh(refresh + 1)
        dispatch(orderByScore(e.target.value))
    }
    
    function handleFilterDiet(e){
        e.preventDefault();
        dispatch(filterRecipesByDiet(e.target.value))
    }
    
    // recipes.forEach((it)=> {console.log(it.title)})
    return(
        <body>
        <div >
            {/* <h1>Welcome to my food app :)</h1> */}
            <div className={s.bar}>
            {/* <label className = {s.label}>Orden alfabético</label> */}
            <div className = {s.navbar}>
            <button onClick={e=> {handleClick(e)}} className = {s.btn}>Inicio</button> 
             <Link to = {'/create'}>
                 <button className = {s.btn}> 
                 Crear receta</button></Link> 
            <select onChange={e => {orderAlf(e)}} className = {s.select}>
                <option value ='All'>Órden alfabético</option>
                <option value ='Ascendente'>Ascendente</option>
                <option value ='Descendente'>Descendente</option>
            </select>
            {/* <label className = {s.label}>Orden por puntuación</label> */}
            <select onChange={e => {orderScore(e)}} className = {s.select}>
                <option value ='All'>Órden por nivel de salud</option>
                <option value ='Ascendente'>Ascendente</option>
                <option value ='Descendente'>Descendente</option>
            </select>
            {/* <label className = {s.label}>Tipo de dieta</label> */}
            <select onChange={e => {handleFilterDiet(e)}} className = {s.select}>
                <option value ='All'>Tipo de dieta</option>
                {
                    diets?.map(d => {
                        return(
                            <option value = {d.name} key = {d.id} className = {s.diet}>{d.name}</option>
                            )
                        })
                    }
            </select>
            <SearchBar/>
            </div>
            <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado}/>
            </div>
            {
                refresh && currentRecipes.map((r, i)=> {
                    return(
                        <div key = {i}> 
                        <Link to={'/home/' + r.id}>
                        <Card image = {r.image} name = {r.title} types = {r.diet} healthScore = {r.healthScore} ></Card>
                        </Link>
                        </div>
                    );
                })
                // : 
                // <div> 
                //     <h1>Cargando...</h1>
                //     </div>
            }  
        </div>
        </body >
    )
}