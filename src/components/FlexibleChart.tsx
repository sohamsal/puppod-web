import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
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
}

interface FlexibleChartProps {
  data: Dog[];
  xAxis: keyof Dog;
  yAxis: keyof Dog;
  title?: string;
}

const FlexibleChart: React.FC<FlexibleChartProps> = ({ data, xAxis, yAxis, title }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>{title}</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlexibleChart;