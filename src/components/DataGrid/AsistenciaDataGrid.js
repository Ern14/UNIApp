import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

const AsistenciaDataGrid = (props) => {
  const { data, columns, idField } = props;
  const [rows, setRows] = useState(data);

  const handleCheckboxChange = (rowId, field) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row[idField] === rowId ? { ...row, [field]: !row[field] } : row
      )
    );
  };

  const defaultColumns = [
    ...columns,
    {
      field: 'firmaEntrada',
      headerName: 'Firma Entrada',
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.FirmaEntrada}
          onChange={() => handleCheckboxChange(params.row[idField], 'FirmaEntrada')}
        />
      ),
    },
    {
      field: 'firmaSalida',
      headerName: 'Firma Salida',
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.FirmaSalida}
          onChange={() => handleCheckboxChange(params.row[idField], 'FirmaSalida')}
        />
      ),
    },
    {
      field: 'asistencia',
      headerName: 'Asistencia',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.FirmaEntrada || params.row.FirmaSalida ? 'Presente' : 'Ausente'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <DataGrid 
        sx={{ height: '500px' }} 
        rows={rows} 
        columns={defaultColumns} 
        getRowId={(row) => row[idField]} 
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

export default AsistenciaDataGrid;