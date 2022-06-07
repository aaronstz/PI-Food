import {Link} from 'react-router-dom';
import s from './styles/LandingPage.module.css'
// import '../index.module.css';
import image from '../wallpaper/bogdan-mb0sco-chinastreetgallery.jpg'
export default function LandingPage(){

    

    return(
        <body style = {{backgroundImage: `url(${image})`}}>
        <div className = {s.container}>
                <h5 className = {s.welcome}>Welcome</h5>
            
            {/* <h1 className={s.welcome}>Welcome</h1> */}
            {/* un plato que diga 'cook!' ?? con unos fideitos we */}
            <Link to='/home'>
                <button className = {s.nubutton} >
                    <p>Wanna Cook?</p>
                <div className = {s.check}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                </div>
                </button>
            </Link>
        </div>
        </body>
    )
}