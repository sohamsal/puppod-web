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
                // Assuming that you want to select the first dog 
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
            <div>
                <h1>Game Sessions</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>GameState</th>
                            <th>Dog ID</th>
                            <th>Is Game Ended</th>
                            <th>Num Dispenses</th>
                            <th>Num Prompts</th>
                            <th>Success Rate</th>
                            <th>Num Missed</th>
                            <th>Current Level</th>
                            <th>Game Time</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={gameSession.SessionId}>
                            <td>{gameSession.SessionId}</td>
                            <td>{gameSession.GameState}</td>
                            <td>{gameSession.DogId}</td>
                            <td>{gameSession.IsGameEnded ? 'Ended' : 'Not Ended'}</td>
                            <td>{gameSession.NumDispenses}</td>
                            <td>{gameSession.NumPrompts}</td>
                            <td>{gameSession.SuccessRate}</td>
                            <td>{gameSession.NumMissed}</td>
                            <td>{gameSession.CurrentLevel}</td>
                            <td>{gameSession.GameTime}</td>
                            <td>{gameSession.Name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ) : (
                <div>Loading...</div>
            )
    );
}