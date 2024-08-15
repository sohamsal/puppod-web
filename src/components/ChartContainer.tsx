"use client"
import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import Select from 'react-select';
import FlexibleChart from './FlexibleChart';

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

const DogDataChart: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [xAxis, setXAxis] = useState<keyof Dog | 'Age'>('Name');
  const [yAxis, setYAxis] = useState<keyof Dog>('LifeTimeStats_TimePlayed');
  const [xAxisFilter, setXAxisFilter] = useState<string[]>([]);

  useEffect(() => {
    fetch('/Dog.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse<Dog>(csvString, {
          header: true,
          complete: (results) => {
            setDogs(results.data);
          }
        });
      })
      .catch(error => console.error('Error fetching and parsing: ', error));
  }, []);

  const numericFields: (keyof Dog)[] = [
    'LifeTimeStats_TimePlayed',
    'LifeTimeStats_TreatsWon',
    'LifeTimeStats_SuccessRate',
    'LifeTimeStats_TotalPrompts',
    'LifeTimeStats_TotalMissed',
    'LifeTimeStats_TotalNegPrompts',
    'LifeTimeStats_TotalHitsNegSound'
  ];

  const xAxisOptions: (keyof Dog | 'Age')[] = ['Name', 'DogId', 'Primary_Breed', 'Gender', 'Neutered', 'Age'];

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const transformedDogs = dogs.map(dog => ({
    ...dog,
    Age: calculateAge(dog.BirthDate).toString()
  }));

  const xAxisValues = useMemo(() => {
    const uniqueValues = new Set(transformedDogs.map(dog => dog[xAxis].toString()));
    return Array.from(uniqueValues).map(value => ({ value, label: value }));
  }, [transformedDogs, xAxis]);

  const filteredDogs = useMemo(() => {
    return xAxisFilter.length > 0 
      ? transformedDogs.filter(dog => xAxisFilter.includes(dog[xAxis].toString())) 
      : transformedDogs;
  }, [transformedDogs, xAxis, xAxisFilter]);

  const handleXAxisFilterChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setXAxisFilter(values);
  };

  return (
    <div>
      <div>
        <label>
          X Axis:
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value as keyof Dog | 'Age')}>
            {xAxisOptions.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </label>
        <label>
          Y Axis:
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value as keyof Dog)}>
            {numericFields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </label>
        <label>
          Filter {xAxis}:
          <Select
            isMulti
            options={xAxisValues}
            onChange={handleXAxisFilterChange}
            value={xAxisValues.filter(option => xAxisFilter.includes(option.value))}
          />
        </label>
      </div>
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
