import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Drawer,
    Divider,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import { menuItems, menuAcordeon, menuCatalogo, menuUsuario } from '../../shared/drawerMenus';
import { ExpandMore, Assignment } from '@mui/icons-material';
import logo from '../../assets/img/logos/logouni12.png';
import './DrawerMenu.css'

const DrawerMenu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Drawer 
            className='drawer'
            variant="permanent"
            anchor="left">
            <Toolbar>
                <figure>
                    <img className='imgLogo' src={logo} alt="UNI"></img>
                </figure>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map(item => (
                    <ListItem
                        key={item.text}
                        disablePadding
                        onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemIcon >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {user && user.idRol === 1 && (
                <List>
                    {menuCatalogo.map(item => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            onClick={() => navigate(item.path)}>
                            <ListItemButton>
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Assignment className='icon-acordeon' />
                            <Typography className='label-text' component="div">
                                Catálogos
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {menuAcordeon.map(item => (
                                <ListItem
                                    key={item.text}
                                    disablePadding
                                    onClick={() => navigate(item.path)}>
                                    <ListItemButton>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </List>
            )}
            <div className='menu-usuario'>
                <Divider />
                <List>
                    {menuUsuario.map(item => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            onClick={() => logout()}>
                            <ListItemButton>
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}

export default DrawerMenu;