import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Dog {
  Name: string;
  Age: string;
  Primary_Breed: string;
  Secondary_Breed: string;
  Gender: string;
  Neutered: string;
  TimePlayed: string;
  TreatsWon: string;
  SuccessRate: string;
  TotalPrompts: string;
  TotalMissed: string;
}

interface FlexibleChartProps {
  data: Dog[];
  xAxis: keyof Dog;
  yAxis: keyof Dog;
  title?: string;
}

const FlexibleChart: React.FC<FlexibleChartProps> = ({ data, xAxis, yAxis, title }) => {
  const formattedData = data.map((d) => ({
    x: d[xAxis],
    y: d[yAxis],
  }));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 className='my-4 font-semibold text-3xl'>{title}</h2>
      <ResponsiveContainer>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name={xAxis} />
          <YAxis
            dataKey="y"
            name={yAxis}
            className='text-xs'
            tickFormatter={(tick) => tick.toString()} // Ensure labels are converted to strings
            width={80} // Adjust width if necessary
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Data Points" data={formattedData} fill="#6d8ee3" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlexibleChart;
