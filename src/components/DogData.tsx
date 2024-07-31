'use client'


import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

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

const DogData = () => {
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<{ [name: string]: Dog }>({}); 
  const [dogNames, setDogNames] = useState<string[]>([]); 

  const parseStaticCSV = () => {
    fetch('/Dog.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse<Dog>(csvString, {
          header: true,
          complete: (results) => {
            // Assuming that you want to select the first dog
            // from the results and that at least one row exists
            const dogData = results.data
            const names = dogData.map(dog => dog.Name)
            setDogNames(names)
            const dogMap: { [name: string]: Dog } = {};
            for (let i = 0; i < dogData.length; i++) {
                dogMap[dogData[i].Name] = dogData[i]
                // dogMap[dog.Name] = dog
            }
            setDogs(dogMap);
          }
        });
      })
      .catch(error => console.error('Error fetching and parsing: ', error));
  };

    useEffect(() => {
        parseStaticCSV();
    }, [])

    const handleSelect = (selectedOption: string) => {
        console.log('Selected option:', selectedOption);
        setSelectedDog(dogs[selectedOption])
    };

    const secondsToDays = (seconds: number) => {
        const days = seconds / (60 * 60 * 24);
        return days.toFixed(2)
    };

    return (
        <div className='flex flex-col justify-center space-y-6'>
            <Dropdown options={dogNames} onSelect={handleSelect} />
            <div className='flex flex-col justify-center bg-[#f2f2f2] text-black rounded-2xl min-h-20'>
                <span className='ml-5 font-semibold text-5xl'>{selectedDog?.Name}</span>
            </div>
            <div className='flex flex-col justify-around bg-[#f2f2f2] text-black rounded-2xl text-2xl font-semibold'>
                <div className='m-5'>
                    <div>Time Played: <span className='text-[#6d8ee3]'>{selectedDog ? secondsToDays(Number(selectedDog?.LifeTimeStats_TimePlayed)) : null} days</span></div>
                    <div>Total Prompts: <span className='text-[#6d8ee3]'>{selectedDog?.LifeTimeStats_TotalPrompts}</span></div>
                    <div>Total treats won: <span className='text-[#6d8ee3]'>{selectedDog?.LifeTimeStats_TreatsWon}</span></div>
                    <div>Total treats missed: <span className='text-[#6d8ee3]'>{selectedDog?.LifeTimeStats_TotalMissed}</span></div>
                    <div>Success rate: <span className='text-[#6d8ee3]'>{selectedDog ? Math.round(Number(selectedDog?.LifeTimeStats_SuccessRate)) : null}</span></div>
                </div>
            </div>
        </div>
    );
};

export default DogData;