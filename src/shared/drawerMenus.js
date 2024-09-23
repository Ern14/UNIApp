import { Home, Book, Person, Logout, Badge, InsertDriveFile } from '@mui/icons-material';

export const menuItems = [
    {
        text: 'Inicio',
        icon: <Home />,
        path: '/Inicio'
    },
    {
        text: 'Bitácora',
        icon: <Book />,
        path: '/bitacora'
    }
]

export const menuCatalogo = [
    {
        text: 'Usuarios',
        icon: <Person />,
        path: 'catalogo/usuario'
    },
    {
        text: 'Roles',
        icon: <Badge />,
        path: 'catalogo/roles'
    }
]

export const menuUsuario = [
    {
        text: 'Manual de usuario',
        icon: <InsertDriveFile />,
    },
    {
        text: 'Cerrar sesión',
        icon: <Logout />,
    }
]

export const menuAcordeon = [
    {
        text: 'Asignaturas',
        path: 'catalogo/asignaturas'
    },
    {
        text: 'Área de conocimiento',
        path: 'catalogo/departamentos'
    },
    {
        text: 'Carerras',
        path: 'catalogo/carreras'
    },
    {
        text: 'Docentes',
        path: 'catalogo/docentes'
    },
    {
        text: 'Grupos',
        path: 'catalogo/grupos'
    },
    {
        text: 'Períodos',
        path: 'catalogo/periodos'
    }
]