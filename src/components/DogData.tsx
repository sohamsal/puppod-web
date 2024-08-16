'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import Dropdown from './Dropdown';

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

const supabase = createClient();

const DogData = () => {
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogNames, setDogNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data, error } = await supabase.from('DogsCombined').select('*');
        if (error) throw error;
        if (data) {
          setDogs(data);
          const names = data.map((dog: Dog) => dog.Name);
          setDogNames(names);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchDogs();
  }, []);

  const handleSelect = (selectedOption: string) => {
    const dog = dogs.find(dog => dog.Name === selectedOption);
    setSelectedDog(dog || null);
  };

  const secondsToDays = (seconds: number) => {
    const days = seconds / (60 * 60 * 24);
    return days.toFixed(2);
  };

  return (
    <div className='flex flex-col justify-center space-y-6'>
      <Dropdown options={dogNames} onSelect={handleSelect} />
      <div className='flex flex-col justify-center bg-[#f2f2f2] text-black rounded-2xl min-h-20'>
        <span className='ml-5 font-semibold text-5xl'>{selectedDog?.Name}</span>
      </div>
      <div className='flex flex-col justify-around bg-[#f2f2f2] text-black rounded-2xl text-2xl font-semibold'>
        <div className='m-5'>
          <div>
            Time Played:{' '}
            <span className='text-[#6d8ee3]'>
              {selectedDog ? secondsToDays(Number(selectedDog.TimePlayed)) : null} days
            </span>
          </div>
          <div>
            Total Prompts: <span className='text-[#6d8ee3]'>{selectedDog?.TotalPrompts}</span>
          </div>
          <div>
            Total Treats Won: <span className='text-[#6d8ee3]'>{selectedDog?.TreatsWon}</span>
          </div>
          <div>
            Total Treats Missed: <span className='text-[#6d8ee3]'>{selectedDog?.TotalMissed}</span>
          </div>
          <div>
            Success Rate:{' '}
            <span className='text-[#6d8ee3]'>
              {selectedDog ? Math.round(Number(selectedDog.SuccessRate)) : null}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogData;
