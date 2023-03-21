import React from "react";

import "./Header.css"

//import logo
import logo from "./../../assets/img/logos/UNI-Logo-Nicaragua.png";

const Header = () => {
    return ( 
        <header className="navbar">
            <img className="logoUni" src={ logo } alt="LogoUNI" />
            <h3>UniLogo</h3>
        </header>
     );
}
 
export default Header;