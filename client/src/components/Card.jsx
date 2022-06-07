import React from 'react';
import s from './styles/Card.module.css';

export default function Card({image, name, types, id, healthScore}){
    return(
        <div className = {s.body}>
        <div key = {id} className ={s.container}>
            <div className = {s.card}>
            <img src={image} alt="Image not found" className={s.img}/>
            <h3 className={s.title}>{name}</h3>
            <h3 className={s.score}>Health Score: {healthScore}</h3>
            {/* <h5>{types}</h5> */}
            {
                types.map((t) => {
                    const apiDiet = t.name;
                    
                    return(
                        <div className={s.description}>
                        <h1 className = {s.text}>{apiDiet || t}</h1>
                        </div>
                    )
                })
            }
            </div>
            

        {/* {types?.map((d) => {
            return(

          <h5>
              
            {d[0].toUpperCase() + d.slice(1)}
          </h5>
            )
        }
        )} */}
        </div>
        </div>
    )
    
}