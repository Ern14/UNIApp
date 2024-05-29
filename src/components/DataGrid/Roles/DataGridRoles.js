import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const DataGridRoles = ( props ) => {
    const { handleForm, handleConfirm, data } = props;

    const handleConfirmLocal = (idRol) => {
        handleConfirm(idRol);
    };

    const handleFormLocal = (idRol) => {
        handleForm(idRol);
    }

    const columns = [
        { field: 'idRol', headerName: 'ID', width: 100 },
        { field: 'Nombre', headerName: 'Nombre', width: 200 },
        { field: 'Descripcion', headerName: 'Descripción', width: 500 },
        {
            field: 'Activo',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Tooltip title="Editar">
                        <IconButton variant="contained" color="primary" onClick={() => handleFormLocal(params.row.idRol)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton variant="contained" color="secondary" onClick={() => handleConfirmLocal(params.row.idRol)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div>
            <DataGrid sx={{
                Height: '500px'
            }}
                rows={data} columns={columns}
                getRowId={(row) => row.idRol}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                pageSizeOptions={[8, 10, 12]}
            />
        </div>
    );
}

export default DataGridRoles;