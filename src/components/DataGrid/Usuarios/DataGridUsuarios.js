import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { obtenerUsuarios } from '../../../services/usuarios.service';

const DataGridUsuarios = () => {
  const [data, setData] = useState([]);

  const eliminarUsuario = async (ID) => {
    axios.post('http://localhost:4000/actualizarUsuarios', {
      idUsuario: ID,
    })
      .then(function () {
        const newData = data.filter(usuario => usuario.idUsuario !== ID);
        setData(newData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const get = async () => {
      const data = await obtenerUsuarios();
      setData(data);
    }
    get();
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
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <DataGrid rows={data} columns={columns} getRowId={(row) => row.idUsuario} />
    </div>
  );
};

export default DataGridUsuarios;