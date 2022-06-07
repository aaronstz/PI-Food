import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetails } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import s from './styles/CardDetail.module.css';
import NavBar from './NavBar';

export default function CardDetail(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const { image, title, diet, summary, healthScore, steps } = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch])


    let dietsArr = diet?.map((d) => {
        if(d.name) {return <li key = {Math.random()}>{d.name}</li>}
        if(d[0] !== 'no diets') {return <li key = {Math.random()}>{d}</li>}
        else return 'no diets'
    })

    return(
        <div className = {s.content}>
            <NavBar/>
            {/* <Link to= '/home'><button className = {s.volver}>Volver</button></Link> */}
            {/* <div className = {s.card}> */}
                <h3 className = {s.title}>{title}</h3>
                <img src = {image} alt = 'Img not found' width = "500px" className = {s.img}></img>
            <div className = {s.summary}>
                <h3>
                Resúmen: 
                <p >{summary}</p>
                </h3>
                <h3 className = {s.diet}>Dietas: <p >{dietsArr}</p></h3>
                
            <div className = {s.scores}>
            <span id="healthScore">
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={healthScore}
              className={s.score}
            />{" "}
            {healthScore}/100
            </span>
            </div>
            <div className={s.instructions}>
            {steps && (
            <p dangerouslySetInnerHTML={{ __html: `${steps}` }} />
          )}
        </div>
            </div>
        // </div>
    )
}