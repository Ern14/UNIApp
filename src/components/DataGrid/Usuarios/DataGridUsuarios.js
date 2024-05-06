import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { obtenerUsuarios, eliminarUsuarios } from '../../../services/usuarios.service';

const DataGridUsuarios = () => {
  const [data, setData] = useState([]);

  const cargarDatos = async () => {
    const data = await obtenerUsuarios();
    setData(data);
  }

  const eliminarUsuario = async (idUsuario) => {
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
        <Button variant="contained" color="secondary" onClick={() => eliminarUsuario(params.row.idUsuario)}>
          <DeleteIcon />
        </Button>
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