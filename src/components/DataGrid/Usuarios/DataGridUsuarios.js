import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const DataGridUsuarios = (props) => {
  const {handleForm, handleConfirm, data} = props;

  const handleConfirmLocal = (idUsuario) => {
    handleConfirm(idUsuario);
  };

  const handleFormLocal = (idUsuario) => {
    handleForm(idUsuario);
  }

  const columns = [
    { field: 'idUsuario', headerName: 'ID', width: 100 },
    { field: 'Correo', headerName: 'Correo', width: 200 },
    { field: 'NombreRol', headerName: 'Permiso', width: 200 },
    {
      field: 'Activo',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <Tooltip title = "Editar">
            <IconButton variant="contained" color="primary" onClick={() => handleFormLocal(params.row.idUsuario)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title = "Eliminar">
            <IconButton variant="contained" color="secondary" onClick={() => handleConfirmLocal(params.row.idUsuario)}>
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
        getRowId={(row) => row.idUsuario} 
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
};

export default DataGridUsuarios;