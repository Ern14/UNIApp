import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const DefaultDataGrid = (props) => {
  const {handleForm, handleConfirm, data, columns, idField, additionalActions } = props;

  const handleConfirmLocal = (Id) => {
    handleConfirm(Id);
  };

  const handleFormLocal = (Id) => {
    handleForm(Id);
  }

  const defaultColumns = [
    ...columns,
    {
      field: 'Activo',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          {additionalActions && additionalActions.map((ActionComponent, index) => (
            <ActionComponent key={index} params={params} />
          ))}
          <Tooltip title = "Editar">
            <IconButton variant="contained" color="primary" onClick={() => handleFormLocal(params.row[idField])}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title = "Eliminar">
            <IconButton variant="contained" color="secondary" onClick={() => handleConfirmLocal(params.row[idField])}>
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
        rows={data} columns={defaultColumns} 
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

export default DefaultDataGrid;