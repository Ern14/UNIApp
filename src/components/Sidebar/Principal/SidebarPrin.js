import React from 'react';
import { useAuth } from '../../../context/authContext';

import './SidebarPrin.css';

const SidebarPrincipal = () => {
    const { user } = useAuth();
    return(
        <div>
            SidebarPrincipal
            {user && user.idRol === 1 && (
            <p>Acción para usuario con rol 1</p>
            )}
        </div>
    );
};

export default SidebarPrincipal;