import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoBarras = () => {
    const data = [
        {
          name: 'Maestro 1',
          Asistencia: 80,
          Ausencia: 10,
          amt: 2400,
        },
        {
          name: 'Maestro 2',
          Asistencia: 60,
          Ausencia: 30,
          amt: 2210,
        },
        {
          name: 'Maestro 3',
          Asistencia: 90,
          Ausencia: 0,
          amt: 2290,
        },
        {
          name: 'Maestro 4',
          Asistencia: 50,
          Ausencia: 50,
          amt: 2000,
        },
        {
          name: 'Maestro 5',
          Asistencia: 40,
          Ausencia: 60,
          amt: 2181,
        },
        {
          name: 'Maestro 6',
          Asistencia: 90,
          Ausencia: 10,
          amt: 2500,
        },
        {
          name: 'Maestro 7',
          Asistencia: 30,
          Ausencia: 70,
          amt: 2100,
        },
      ];


    return(
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Asistencia" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Ausencia" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
    );
}

export default GraficoBarras;