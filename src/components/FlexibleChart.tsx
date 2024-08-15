import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Dog {
  DogId: string;
  UserId: string;
  Name: string;
  BirthDate: string;
  Primary_Breed: string;
  Secondary_Breed: string;
  PictureLocation: string;
  CurrentLevel: string;
  Gender: string;
  Neutered: string;
  LifeTimeStats_TimePlayed: string;
  LifeTimeStats_TreatsWon: string;
  LifeTimeStats_SuccessRate: string;
  LifeTimeStats_TotalPrompts: string;
  LifeTimeStats_TotalMissed: string;
  LifeTimeStats_TotalNegPrompts: string;
  LifeTimeStats_TotalHitsNegSound: string;
  ModifiedCreatedTime: string;
  Age?: string;
}

interface FlexibleChartProps {
  data: Dog[];
  title?: string;
}

const FlexibleChart: React.FC<FlexibleChartProps> = ({ data, title }) => {
  const [xAxis, setXAxis] = useState<keyof Dog | 'Age'>('Name');
  const [yAxis, setYAxis] = useState<keyof Dog>('LifeTimeStats_TreatsWon');

  // y-axis x-axis 
  const xAxisOptions: (keyof Dog | 'Age')[] = [
    'Name',
    'DogId',
    'Primary_Breed',
    'Gender',
    'Neutered',
    'Age',
  ];
  const yAxisOptions: (keyof Dog)[] = [
    'LifeTimeStats_TimePlayed',
    'LifeTimeStats_TreatsWon',
    'LifeTimeStats_SuccessRate',
    'LifeTimeStats_TotalPrompts',
    'LifeTimeStats_TotalMissed',
    'LifeTimeStats_TotalNegPrompts',
    'LifeTimeStats_TotalHitsNegSound',
  ];

  // y-axis scaling
  const numericData = data.map(dog => ({
    ...dog,
    [yAxis]: parseFloat(dog[yAxis]) || 0,
  }));

  // Find min and max values for the Y-Axis
  const yAxisValues = numericData.map(dog => dog[yAxis]);
  const yMin = Math.min(...yAxisValues) * 0.95; // y axis scaling
  const yMax = Math.max(...yAxisValues) * 1.05; 

  return (
    <div style={{ width: '100%', height: 500 }}>
      {title && <h2 style={{ textAlign: 'center' }}>{title}</h2>}
      {/* Dropdowns Container */}
      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <div>
          <label htmlFor="xAxis" style={{ marginRight: '10px', fontWeight: 'bold' }}>
            X-Axis:
          </label>
          <select
            id="xAxis"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value as keyof Dog | 'Age')}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            {xAxisOptions.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yAxis" style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Y-Axis:
          </label>
          <select
            id="yAxis"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value as keyof Dog)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            {yAxisOptions.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer>
        <LineChart data={numericData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey={xAxis}
            label={{ value: xAxis, position: 'insideBottom', offset: -5 }}
            tick={{ fill: '#555' }}
          />
          <YAxis
            label={{ value: yAxis, angle: -90, position: 'insideLeft', offset: -5 }}
            tick={{ fill: '#555' }}
            domain={[yMin, yMax]} 
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }}
            labelStyle={{ color: '#333' }}
            formatter={(value: string | number) => [`${value}`, yAxis]}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line
            type="monotone"
            dataKey={yAxis}
            stroke="#6d8ee3"
            strokeWidth={2}
            dot={{ stroke: '#6d8ee3', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlexibleChart;
