import React, {useState} from 'react';
import classNames from 'classnames';
import {Game, Library} from '@types';
import styles from '@styles/library.module.css';

type Props = {
    games: Array<Game>,
    library?: Library | null
    userRole: string | null
};

const LibraryTable: React.FC<Props> = ({ games, library, userRole }: Props) => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {games.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedGame(game)}
                        className={classNames(styles.button, {
                            [styles.buttonSelected]: selectedGame?.title === game.title
                        })}
                    >
                        {game.title}
                    </button>
                ))}
            </div>

            <div
                className={classNames(styles.content, {
                    [styles.contentCentered]: !selectedGame,
                    [styles.contentStart]: selectedGame
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
                            <strong>Time played:</strong> {library?.timePlayed}h
                        </p>
                        { userRole === "Tester" ? (
                            <p className={styles.paragraph}><strong>Achievements:</strong> 25/{library?.achievements}</p>
                        ) : (
                            <p className={styles.paragraph}><strong>Achievements:</strong> 0/{library?.achievements}</p>
                        )}
                    </div>
                ) : (
                    <p className={styles.placeholder}>Please select a game from the sidebar.</p>
                )}
            </div>
        </div>
    );
};

export default LibraryTable;
