import React, { useState } from 'react';
import classNames from 'classnames';
import { Game } from '@types';
import styles from '@styles/library.module.css';

type Props = {
    games: Array<Game>;
};

const LibraryTable: React.FC<Props> = ({ games }: Props) => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {games.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedGame(game)}
                        className={classNames(styles.button, {
                            [styles.buttonSelected]: selectedGame?.title === game.title,
                        })}
                    >
                        {game.title}
                    </button>
                ))}
            </div>

            <div
                className={classNames(styles.content, {
                    [styles.contentCentered]: !selectedGame,
                    [styles.contentStart]: selectedGame,
                })}
            >
                {selectedGame ? (
                    <div className={styles.selectedGame}>
                        <img
                            src={selectedGame.image}
                            alt={selectedGame.title}
                            className={styles.image}
                        />
                        <h2 className={styles.title}>{selectedGame.title}</h2>
                        <p className={styles.paragraph}>
                            {/*<strong>Time played:</strong> {selectedGame.playTime}h*/}
                        </p>
                        <p className={styles.paragraph}>
                            {/*<strong>Achievements:</strong> {selectedGame.achievementsUnlocked}/{selectedGame.totalAchievements}*/}
                        </p>
                    </div>
                ) : (
                    <p className={styles.placeholder}>Please select a game from the sidebar.</p>
                )}
            </div>
        </div>
    );
};

export default LibraryTable;
