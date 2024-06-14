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
    LifeTimeStats_TreatsWon	: string;
    LifeTimeStats_SuccessRate: string;	
    LifeTimeStats_TotalPrompts: string;	
    LifeTimeStats_TotalMissed	: string;
    LifeTimeStats_TotalNegPrompts	: string;
    LifeTimeStats_TotalHitsNegSound	: string;
    ModifiedCreatedTime: string;
}  



const dogData = () => {
    const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const parseStaticCSV = () => {
    fetch('/dog.csv')
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

    return(
        <div>
            {selectedDog ? (
        <div>
          <p>Name: {selectedDog.Name}</p>
          <p>Age: {selectedDog.Primary_Breed}</p>
          <p>Breed: {selectedDog.Gender}</p>
        </div>
        ) : (
            <div>Loading...</div>
      )}
    </div>
    );
};

export default dogData;