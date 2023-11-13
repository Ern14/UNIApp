import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const DataGridUsuarios = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Datos del Servidor
      axios.get('http://localhost:4000/usuarios')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    // Columnas de DataGrid
    const columns = [
      { field: 'idUsuario', headerName: 'ID', width: 100 },
      { field: 'Correo', headerName: 'Correo', width: 200 },
      { 
        field: 'Activo',
        headerName: 'Estado',
        width: 200 ,
        valueGetter: (params) => (params.value ? 'Activo' : 'Inactivo')
      },
    ];
  
    return (
      <div>
        <DataGrid rows={data} columns={columns} getRowId={(row) => row.idUsuario} />
      </div>
    );
  };
  
  export default DataGridUsuarios;