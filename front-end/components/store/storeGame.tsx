import {Game} from '@types';
import React from 'react';
import styles from '@styles/store.module.css';

interface storeGameProps {
    game: Game;
}

const storeGame: React.FC<storeGameProps> = ({ game }) => {
    return (
        <div className={styles.gamePageDiv}>
            <img src={game.image} alt={"Game image"} className={styles.gamePageImage} />
            <table className={styles.gamePageTable}>
                <tbody>
                <tr>
                    <td className={styles.gamePageTitle}>{game.title}</td>
                </tr>
                <tr>
                    <td className={styles.gamePagePrice}>€{game.price.toFixed(2)}</td>
                </tr>
                {game.discount &&
                    <tr>
                        <td className={styles.gamePageDiscount}>{`-${game.discount}%`}</td>
                    </tr>
                }
                <tr>
                    <td className={styles.gamePageCategories}>
                        {game.categories.join(', ')}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default storeGame;
