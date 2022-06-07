import React from 'react';
import { useState,  } from 'react'
import { useDispatch } from 'react-redux'
import { getNameRecipes } from '../actions'
import s from './styles/Bar.module.css'
import search from '../wallpaper/icon.png'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name))
    }
    return (
        <div >
            <input
            type="text"
            placeholder="Search..."
            onChange = {(e) => handleInput(e)}
            className = {s.search}
            />
            <button type="submit" onClick = {(e) => handleSubmit(e)} className = {s.img}>
            {/* <img src = {search} alt = 'search' className = {s.img}/> */}
            Buscar
            </button>
        </div>
    )
}