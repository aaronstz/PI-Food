import React from "react";
import { Link } from "react-router-dom";
import logoHome from "../wallpaper/home.png";
import SearchBar from './SearchBar'
import s from "./styles/NavBar.module.css";

export default function NavBar() {
  return (
      <div>
        <div >
        <Link to="/home">
            <img src={logoHome} alt="Home" width="40px" height="40px" className = {s.circle} />
        </Link>
        </div>
    </div>
  );
}