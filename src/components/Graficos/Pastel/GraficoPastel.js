import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

import './GraficoPastel.css'


const GraficoPastel = () => {
    const data01 = [
        { name: 'Asistencia', value: 80 },
        { name: 'Ausencia', value: 10 },
    ];

    return(
      <div className='contenedor'>
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
        <h3 className='nombre'>Maestro 1</h3>
      </div>
    );

}

export default GraficoPastel;