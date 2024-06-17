"use client"
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

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

const dogData = () => {
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const parseStaticCSV = () => {
    fetch('/Dog.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse<Dog>(csvString, {
          header: true,
          complete: (results) => {
            // Assuming that you want to select the first dog
            // from the results and that at least one row exists
            if (results.data.length > 0) {
              setSelectedDog(results.data[0]);
            }
          }
        });
      })
      .catch(error => console.error('Error fetching and parsing: ', error));
  };

  useEffect(() => {
    parseStaticCSV();
  }, [])

  return (
    selectedDog ? (
      <>
      
      <div>
        {/* <p>Name: {selectedDog.Name}</p>
        <p>Age: {selectedDog.Primary_Breed}</p>
        <p>Breed: {selectedDog.Gender}</p> */}
      </div>
      <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[1512px] h-[982px]">
        <div className="h-[982px] bg-neutral-50">
          <div className="relative w-[1336px] h-[838px] top-[72px] left-[88px]">
            <div className="absolute w-[1336px] h-[230px] top-0 left-0 bg-[#f2f2f2] rounded-[31px]">
              <div className="absolute w-[358px] h-[103px] top-[63px] left-[243px]">
                <div className="absolute w-[310px] top-0 left-0 [font-family:'Inter',Helvetica] font-semibold text-[#16181d] text-[90px] tracking-[0] leading-[normal] whitespace-nowrap">
                  {selectedDog.Name}
                </div>
              </div>
              <div className="absolute w-[1235px] h-[168px] top-[31px] left-[42px]">
                <div className="flex flex-col items-start gap-3.5 absolute w-[337px] h-[85px] top-[42px] left-[896px]">
                  <p className="relative self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#2c2c2c] text-4xl text-right tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter',Helvetica] font-semibold text-[#2c2c2c] text-4xl tracking-[0]">
                    {selectedDog.Primary_Breed}<br />
                    </span>
                  </p>
                  <p className="relative self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#2c2c2c] text-4xl text-right tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter',Helvetica] font-semibold text-[#2c2c2c] text-4xl tracking-[0]">
                    {selectedDog.Gender}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
    ) : (
      <div>Loading...</div>
    )

  );
};

export default dogData;