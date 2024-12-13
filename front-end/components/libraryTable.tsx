import React, { useState } from 'react';
import { Game } from '@types';

type Props = {
    games: Array<Game>;
};

const LibraryTable: React.FC<Props> = ({ games }: Props) => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    return (
        <div
            style={{
                display: 'flex',
                fontFamily: 'Arial, sans-serif',
                height: '500px', 
                width: '900px', 
                margin: '20px auto', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #333',
            }}
        >
            <div
                style={{
                    width: '25%', 
                    backgroundColor: '#212529',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {games.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedGame(game)}
                        style={{
                            padding: '12px',
                            textAlign: 'left',
                            backgroundColor: selectedGame?.title === game.title ? '#2a2a2a' : '#212529',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            outline: 'none',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                            fontSize: '14px',
                        }}
                    >
                        {game.title}
                    </button>
                ))}
            </div>

            <div
                style={{
                    flex: 1,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: selectedGame ? 'flex-start' : 'center',
                    backgroundColor: '#2a2a2a',
                }}
            >
                {selectedGame ? (
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <img
                            src={selectedGame.image}
                            alt={selectedGame.title}
                            style={{
                                width: '30rem',
                                height: 'auto',
                                marginBottom: '15px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                            }}
                        />
                        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{selectedGame.title}</h2>
                        <p style={{ fontSize: '16px', margin: '5px 0', color: '#333' }}>
                            <strong>Time played:</strong> {selectedGame.playTime}h
                        </p>
                        <p style={{ fontSize: '16px', margin: '5px 0', color: '#333' }}>
                            <strong>Achievements:</strong> {selectedGame.achievementsUnlocked}/{selectedGame.totalAchievements}
                        </p>
                    </div>
                ) : (
                    <p style={{ fontSize: '16px', color: '#666' }}>Please select a game from the sidebar.</p>
                )}
            </div>
        </div>
    );
};

export default LibraryTable;
