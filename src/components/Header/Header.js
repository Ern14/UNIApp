import React from "react";
import { AppBar } from "@mui/material";
import logo from "../../assets/img/logos/logouni12.png";
import "./Header.css";


const Header = () => {
    return (
        <AppBar sx = {{
            backgroundColor: 'darkblue',
            width: '100%',
            height: '20vh'
        }}>
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
        </AppBar>
    );
}
 
export default Header;