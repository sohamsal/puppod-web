"use client";

import Papa from 'papaparse'
import { useState, useEffect } from 'react';

interface GameSession {
    'GameState': number;
    'DogId': string;
    'SessionId': string;
    'IsGameEnded': boolean;
    'NumDispenses' : number;
    'NumPrompts' : number; 
    'SuccessRate' : number;
    'NumMissed' : number;
    'CurrentLevel' : number; 
    'GameTime' : string; 
    'Name' : string;
}

export default function GameSessionData() {
    const [gameSession, setGameSession] = useState<GameSession | null>(null);

    const parseStaticCSV = () => {
        fetch('/GameSessions.csv')
          .then(response => response.text())
          .then(csvString => {
            Papa.parse<GameSession>(csvString, {
              header: true,
              complete: (results) => {
                // Assuming that you want to select the first dog/game session
                // from the results and that at least one row exists
                if (results.data.length > 0) {
                  setGameSession(results.data[0]);
                }
              }
            });
          })
          .catch(error => console.error('Error fetching and parsing: ', error));
      };

    useEffect(() => {
        parseStaticCSV();
    }, []);

    return (
        gameSession ? (
            <div className="flex flex-col justify-between h-screen p-12 bg-neutral-50">
                <div className='flex flex-row justify-between basis-[30%]'>
                    <div className='flex flex-row justify-around basis-[35%] bg-[#f2f2f2] text-black rounded-2xl'>
                        <div className='flex flex-col justify-center'>
                            pfp
                        </div>
                        <div className='flex flex-col justify-center items-start basis-'>
                            <div className='flex justify-center font-semibold text-6xl'>
                                {gameSession.Name}
                            </div>
                            <div className='flex justify-center text-[#858585]'>
                                DOG ID: {gameSession.DogId}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center basis-[15%] bg-[#f2f2f2] text-black rounded-2xl'>
                        <div className='flex justify-center text-[#858585] text-2xl'>
                            Level
                        </div>
                        <div className='flex justify-center font-semibold text-9xl'>
                            {gameSession.CurrentLevel}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between basis-[65%] '> 
                    <div className='flex flex-col justify-between basis-[20%]'>
                        <div className='flex flex-col justify-center basis-[45%] bg-[#f2f2f2] text-black rounded-2xl'>
                            <div className='flex justify-center text-[#858585] text-2xl'>
                                Game State
                            </div>
                            <div className='flex justify-center font-semibold text-9xl'>
                                {gameSession.GameState}
                            </div>
                        </div>
                        <div className='flex flex-col justify-around basis-[45%] bg-[#f2f2f2] text-black rounded-2xl'>
                            <div className='flex justify-center text-[#858585] text-2xl'>
                                Game Ended
                            </div>
                            <div className='flex justify-center font-semibold text-8xl'>
                                {gameSession.IsGameEnded}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between basis-[75%]'>
                        <div className='flex flex-row justify-center basis-[20%] bg-[#f2f2f2] text-black rounded-2xl'>
                            <div className='flex flex-col justify-center font-semibold text-5xl'>
                                Time Alotted: {gameSession.GameTime}
                            </div> 
                        </div>
                        <div className='flex flex-row justify-between basis-[70%]'>
                            <div className='flex flex-row justify-center bg-[#f2f2f2] text-black basis-[60%] rounded-2xl'>
                                <div className='flex flex-col justify-evenly basis-[80%]'>
                                    <div className='flex flex-row justify-between font-semibold text-4xl basis-'>
                                        <div>Prompts: </div><div>{gameSession.NumPrompts}</div>
                                    </div>
                                    <div className='flex flex-row justify-between font-semibold text-4xl basis-'>
                                        <div>Dispenses: </div><div>{gameSession.NumDispenses}</div>
                                    </div>
                                    <div className='flex flex-row justify-between font-semibold text-4xl basis-'>
                                        <div>Missed: </div><div>{gameSession.NumMissed}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center bg-[#f2f2f2] text-black basis-[35%] rounded-2xl'>
                                <div className='flex justify-center font-semibold text-2xl'>
                                    {gameSession.SuccessRate}
                                </div>
                                <div className='flex justify-center font-semibold text-2xl'>
                                    Success Rate
                                </div>
                            </div>

                        </div>

                    </div>
                    
                </div>
            </div>
            ) : (
                <div>Loading...</div>
            )
    );
}