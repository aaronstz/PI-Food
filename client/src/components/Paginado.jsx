import React from 'react';
import s from './styles/Paginado.module.css'


export default function Paginado ({recipesPerPage, recipes, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul >
                {   pageNumbers && pageNumbers.map(n => (
                        // <li className= 'number' key={n}>
                        
                        <button className = {s.button} onClick={()=> paginado(n)}>{n}</button>
                        
                        // </li>
                    ))
                }
            </ul>
        </nav>
    )
}