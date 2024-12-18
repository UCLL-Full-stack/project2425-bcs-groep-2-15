import React, { useEffect, useState } from 'react';
import { Game } from '@types';
import LibraryService from '@services/LibraryService';
import PurchaseService from '@services/PurchaseService';
import styles from '@styles/store.module.css';
import userService from '@services/UserService';
import { router } from 'next/client';

interface StoreTableProps {
    games: Array<Game>;
    updateBalance: () => void;
}

const StoreTable: React.FC<StoreTableProps> = ({ games, updateBalance }) => {
    const [libraryGames, setLibraryGames] = useState<Game[]>([]);
    const [filter, setFilter] = useState<'all' | 'discounts' | 'category'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [userId, setUserId] = useState<number>(1);
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();

        const fetchUserBalance = async () => {
            const user = await userService.getUserById(userId);
            const userJson = await user.json();
            if (userJson) {
                setBalance(userJson.balance);
            }
        }
        fetchUserBalance();
    }, []);

    const fetchLibraryGames = async () => {
        try {
            const response = await LibraryService.getAllLibraryGames(userId);
            setLibraryGames(await response.json());
        } catch (error) {
            console.error('Error fetching library games:', error);
        }
    };

    useEffect(() => {
        fetchLibraryGames();
    }, []);

    useEffect(() => {
        const allCategories = Array.from(new Set(games.flatMap(game => game.categories)));
        setCategories(allCategories);
    }, [games]);

    const handlePurchase = async (game: Game) => {
        const confirmPurchase = window.confirm('Are you sure you want to purchase this game?');
        if (confirmPurchase) {
            if (balance < game.price) {
                window.alert('You do not have enough money in your balance.');
            } else {
                await PurchaseService.newPurchase(userId, game.id);
                await fetchLibraryGames();
                updateBalance();
            }
        }
    };

    const filterGames = () => {
        let filteredGames = [...games];

        if (filter === 'discounts') {
            filteredGames = filteredGames.filter(game => game.discount && game.discount > 0);
        }

        if (filter === 'category' && selectedCategory) {
            filteredGames = filteredGames.filter(game =>
                game.categories.includes(selectedCategory)
            );
        }

        return filteredGames;
    };

    return (
        <>
            <div className={styles.filterButtons}>
                <button onClick={() => setFilter('all')} className={styles.filterButton}>All</button>
                <button onClick={() => setFilter('discounts')} className={styles.filterButton}>Discounts</button>
                <button onClick={() => setFilter('category')} className={styles.filterButton}>By category</button>
            </div>

            {filter === 'category' && (
                <div className={styles.categorySelect}>
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            )}

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
                                {libraryGames?.some((ownedGame) => ownedGame.id === game.id) ? (
                                    <span className={styles.purchasedButton}>Purchased</span>
                                ) : (
                                    <a href="#" onClick={() => handlePurchase(game)} className={styles.purchaseButton}> Purchase </a>
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
