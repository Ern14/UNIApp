import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { obtenerUsuarios, eliminarUsuarios } from '../../../services/usuarios.service';
import Confirmation from '../../Dialog/Confimation/Confirmation';

const DataGridUsuarios = () => {
  const [data, setData] = useState([]);
  const [estado, setEstado] = useState(false);
  const [idUsuario, setIdUsuario] = useState();

  const cargarDatos = async () => {
    const data = await obtenerUsuarios();
    setData(data);
  }

  const handleDialog = (idUsuario) => {
    setEstado(true);
    setIdUsuario(idUsuario);
  };

  const eliminarUsuario = async () => {
      const data = await eliminarUsuarios(idUsuario);
      if(data.status === "Exito"){
        cargarDatos();
      }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

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
            <IconButton variant="contained" color="primary" onClick={() => handleDialog(params.row.idUsuario)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title = "Eliminar">
            <IconButton variant="contained" color="secondary" onClick={() => handleDialog(params.row.idUsuario)}>
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
      <Confirmation
        estado={estado}
        setEstado={setEstado}
        onConfirm={eliminarUsuario}
      />
    </div>
  );
};

export default DataGridUsuarios;