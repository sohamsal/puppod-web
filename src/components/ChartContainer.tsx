"use client"
import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import FlexibleChart from './FlexibleChart';
import { createClient } from '@/utils/supabase/client'

interface Dog {
  // DogId: string;
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
  // TotalNegPrompts: string;
  // TotalHitsNegSound: string;
  // ModifiedCreatedTime: string;
}

const supabase = createClient();

const DogDataChart: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [xAxis, setXAxis] = useState<keyof Dog | any>('Name');
  const [yAxis, setYAxis] = useState<keyof Dog | any>('LifeTimeStats_TimePlayed');
  const [xAxisFilter, setXAxisFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data, error } = await supabase
          .from('DogsCombined') // Replace with your table name
          .select('*');

        if (error) throw error;
        setDogs(data || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchDogs();
    setYAxis('TimePlayed');
    setXAxis('Name');
  }, []);

  const numericFields: (keyof Dog)[] = [
    'TimePlayed',
    'TreatsWon',
    'SuccessRate',
    'TotalPrompts',
    'TotalMissed',
  ];

  const xAxisOptions: (keyof Dog | 'Age')[] = ['Name',  'Primary_Breed', 'Gender', 'Neutered', 'Age'];

  // const calculateAge = (birthDate: string): number => {
  //   const birth = new Date(birthDate);
  //   const now = new Date();
  //   let age = now.getFullYear() - birth.getFullYear();
  //   const monthDiff = now.getMonth() - birth.getMonth();
  //   if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };

  const transformedDogs = dogs.map(dog => ({
    ...dog,
    Age: dog.Age
  }));

  // Filter out duplicate entries based on the selected xAxis value
  const uniqueDogs = useMemo(() => {
    const seen = new Set();
    return transformedDogs.filter(dog => {
      const value = dog[xAxis as keyof Dog].toString();
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
  }, [transformedDogs, xAxis]);

  const xAxisValues = useMemo(() => {
    const uniqueValues = new Set(uniqueDogs.map(dog => dog[xAxis as keyof Dog].toString()));
    return Array.from(uniqueValues).map(value => ({ value, label: value }));
  }, [uniqueDogs, xAxis]);

  const filteredDogs = useMemo(() => {
    return xAxisFilter.length > 0
      ? uniqueDogs.filter(dog => xAxisFilter.includes(dog[xAxis as keyof Dog].toString()))
      : uniqueDogs;
  }, [uniqueDogs, xAxis, xAxisFilter]);

  const handleXAxisFilterChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setXAxisFilter(values);
  };

  return (
    <div>
      <div className='flex flex-row justify-around'>
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
            {numericFields.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label>
        Filter {xAxis}:
        <Select
          isMulti
          options={xAxisValues}
          onChange={handleXAxisFilterChange}
          value={xAxisValues.filter(option => xAxisFilter.includes(option.value))}
        />
      </label>
      {dogs.length > 0 && (
        <FlexibleChart
          data={filteredDogs}
          xAxis={xAxis}
          yAxis={yAxis}
          title={`${yAxis} vs ${xAxis}`}
        />
      )}
    </div>
  );
};

export default DogDataChart;
