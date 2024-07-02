import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

const AsistenciaDataGrid = (props) => {
  const { data, columns, idField } = props;
  const [rows, setRows] = useState(data);

  const handleCheckboxChange = (rowId) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, asistencia: !row.asistencia } : row
    ));
  };

  const defaultColumns = [
    {
        field: 'asistencia',
        headerName: 'Asistencia',
        width: 150,
        renderCell: (params) => (
          <Checkbox 
            checked={params.row.asistencia || false} 
            onChange={() => handleCheckboxChange(params.row.id)} 
          />
        ),
      },
    ...columns,
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