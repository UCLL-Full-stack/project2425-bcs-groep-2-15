import {Game} from '@types';
import styles from '@styles/store.module.css';
import {useRouter} from 'next/router';

interface StoreTableProps {
}

interface StoreTableProps {
    filterGames: () => Game[],
    handlePurchase: (game: Game) => Promise<void>,
    libraryGames: Game[]
}

const StoreTable: React.FC<StoreTableProps> = ({ filterGames, handlePurchase, libraryGames }) => {
    const router = useRouter();

    return (
        <>
            {filterGames().length > 0 && (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filterGames().map((game, index) => (
                        <tr
                            key={index}
                            onClick={() => router.push(`/store/${game.id}`)}
                            role="button"
                        >
                            <td className={styles.image}>
                                <img
                                    src={game.image}
                                    alt={game.title}
                                />
                            </td>
                            <td className={styles.titleAndCategories}>
                                <div className={styles.title}>{game.title}</div>
                                <div className={styles.categories}>{game.categories.join(', ')}</div>
                            </td>
                            <td className={styles.discountColumn}>
                                {game.discount && game.discount > 0 ? (
                                    <span className={styles.discount}>{`-${game.discount}%`}</span>
                                ) : (
                                    ''
                                )}
                            </td>
                            <td className={styles.price}>€{game.price.toFixed(2)}</td>
                            <td className={styles.purchaseColumn}>
                                {libraryGames.some((ownedGame: Game) => ownedGame.id === game.id) ? (
                                    <span className={styles.purchasedButton}>Purchased</span>
                                ) : (
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePurchase(game);
                                        }}
                                        className={styles.purchaseButton}
                                    >
                                        Purchase
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default StoreTable;
