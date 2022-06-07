import { useDispatch, useSelector } from 'react-redux';
import s from './styles/Create.module.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDiets, createRecipe } from '../actions'
import NavBar from './NavBar'


function validate(input) {
    let validateName = /^[a-zA-Z\s]+$/;
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    let errors = {};
    if(!input.title.length){
        errors.title = 'Este campo no puede estar vacío';
    }
    if(!validateName.test(input.title)){
        errors.title = 'El nombre no puede contener carácteres especiales o números'
    }
    if (input.image && !validateUrl.test(input.image)){
        errors.image = 'Esta no es una URL válida'
    }
    if (input.healthScore > 100 || input.healthScore < 1){
        errors.healthScore = 'El nivel de salud debe ser entre 0 y 100'
    }
    if (!input.diet){
        errors.diet = 'Tiene que tener al menos una dieta'
    }
    return errors;
}

export default function Create(){
    const dispatch = useDispatch();
    const diets = useSelector(store => store.diets)
    const history = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() =>{
        getDiets(dispatch);
    }, [dispatch])

    const [input, setInput] = useState({
        title:'',
        summary: '',
        image:'',
        healthScore: 0,
        steps: '',
        diet: []
    })
    
    console.log(input)
    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleClick(e){
    }
    
    function handleSelect(e){
        e.preventDefault();
        setInput({
            ...input,
            diet: [...input.diet, e.target.value]
        })
    }
    

    
    
    function handleSubmit(e){
        e.preventDefault();
        if (Object.keys(errors).length === 0 && input.diet.length > 0){

        
        dispatch(createRecipe(input))
        const btn = document.getElementById('btn').classList.add('active');
        console.log(input)
        // alert('Receta creada con éxito!')
        
        const btnText = document.getElementById("btnText")
        btnText.innerHTML = 'Receta creada!'
        
        setInput({
            title:'',
            summary: '',
            image:'',
            healthScore: 0,
            steps: '',
            diet: []
        })
        // history('/home')
    }else{
        alert('Todos los campos son obligatorios')
    }
    }
    
    return (
        <body className = {s.body}>

        <div className={s.create} >
            <NavBar/>
            {/* <Link to= '/home'><button className = {s.volver}>Volver</button></Link> */}
            <h1>Creá tu receta!</h1>
            <form onSubmit = {(e) => handleSubmit(e)} className={s.card}>
                <label className={s.info} >Nombre: </label>
                <input onChange= {(e)=>{handleChange(e)}} type = 'text' value = {input.title} name='title' placeholder= '...' className={s.form}/>
                <label className={s.info} >Nivel de salud: </label>
                <input onChange= {(e)=>{handleChange(e)}} type = 'number' value = {input.healthScore} name='healthScore' className={s.form} />
                <label className={s.info} >Resumen: </label>
                <input onChange= {(e)=>{handleChange(e)}} type = 'text' value = {input.summary} name='summary' placeholder= '...' className={s.form}/>
                <label className={s.info} >Imágen: </label>
                <input onChange= {(e)=>{handleChange(e)}} type = 'text' value = {input.image} name='image' placeholder= '...' className={s.form}/>
                <label className={s.info} >Pasos: </label>
                <input onChange= {(e)=>{handleChange(e)}} type = 'text' value = {input.steps} name='steps' placeholder= '...' className={s.form} />
                {/* <input onChange= {(e)=>{handleChange(e)}} type = '' value = ''/> */}
                <label className={s.info} >Dietas:</label>
                <select onChange = {(e)=>{handleSelect(e)}} className={s.diet}>
                    {
                        diets?.map(d=>{
                            return(
                                <option value={d.id}>{d.name}</option>
                                )
                            })
                        }
                </select>
                <button type="submit" className={s.button} id = 'btn'>
                    <p id = "btnText" className = {s.p}>Crear receta</p>
                </button>
            </form>
        </div>
                        {errors.title && <h6 className={s.error}>{errors.title}</h6>}
                        {errors.image && <h6 className={s.error}>{errors.image}</h6>}
                        {errors.summary && <h6 className={s.error}>{errors.summary}</h6>}
                        {errors.healthScore && <h6 className={s.error}>{errors.healthScore}</h6>}
                        {errors.steps && <h6 className={s.error}>{errors.steps}</h6>}
                        {errors.diet && <h6 className={s.error}>{errors.diet}</h6>}
        </body>
    )
}