import React from "react";
import "./Header.css";
import logo from "../../assets/img/logos/logouni12.png";

const Header = () => {
    return (
        <header className="topbar">
            <div className="group">
                <div className="box">
                    <figure>
                        <img src={logo} alt="UNI"></img>
                    </figure>
                </div>
                <div className="box">
                    <h1>Universidad Nacional de Ingeniería</h1>
                    <h2>Sistema de Asistencia Docente</h2>
                </div>
            </div>
        </header>
    );
}
 
export default Header;