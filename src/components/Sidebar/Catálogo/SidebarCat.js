import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarCat.css';

const Sidebar = () => {
    return(
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <h3 className='dashboardTitle'>Dashboard</h3>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Usuarios</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            <Link to='usuario'>
                                Administración de Usuarios
                            </Link> 
                        </li>
                    </ul>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Docentes</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                           <Link to='docente'>
                                Lista de Docentes
                            </Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;