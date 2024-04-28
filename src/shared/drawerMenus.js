import { Home, Book, BarChart, Person, Logout } from '@mui/icons-material';

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
    },
    {
        text: 'Informe gráfico',
        icon: <BarChart />,
        path: '/informe'
    }
]

export const menuCatalogo = [
    {
        text: 'Usuarios',
        icon: <Person />,
        path: 'catalogo/usuario'
    }
]

export const menuUsuario = [
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
        text: 'Asistencias',
        path: 'catalogo/asistencias'
    },
    {
        text: 'Departamentos',
        path: 'catalogo/departamentos'
    }
    ,
    {
        text: 'Docentes',
        path: 'catalogo/docentes'
    }
    ,
    {
        text: 'Grupos',
        path: 'catalogo/docentes'
    }
    ,
    {
        text: 'Períodos',
        path: 'catalogo/docentes'
    }
]