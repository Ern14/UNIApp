import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const Datagrid = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Datos del Servidor
      axios.get('http://localhost:4000/users')
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
      { field: 'correo', headerName: 'Correo', width: 200 },
      { field: 'userStatus', headerName: 'Estado', width: 200 },
    ];
  
    return (
      <div>
        <DataGrid rows={data} columns={columns} getRowId={(row) => row.idUsuario} />
      </div>
    );
  };
  
  export default Datagrid;