import { React } from 'react';
import { Typography } from '@mui/material';
import './Topbar.css';

const Topbar = () => {
    return(
        <div className="topbar-container">
            <Typography
                className='label'>
                Bienvenido
            </Typography>
        </div>
    );
}

export default Topbar;
