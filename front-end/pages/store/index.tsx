import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { Game } from '@types';
import React, { useEffect, useState } from 'react';
import GameService from '@services/GameService';
import { getBalance } from '../balance';
import userService from '@services/UserService';
import LibraryService from '@services/LibraryService';
import PurchaseService from '@services/PurchaseService';
import { useRouter } from 'next/router';
import StoreTable from '@components/store/storeTable';
import libraryService from '@services/LibraryService';

const Store: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [libraryGames, setLibraryGames] = useState<Game[]>([]);
    const [filter, setFilter] = useState<'all' | 'discounts' | 'category'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId !== null) {
            const fetchUserBalance = async () => {
                const user = await userService.getUserById(userId);
                const userJson = await user.json();
                if (userJson) {
                    setBalance(userJson.balance);
                }
            }
            fetchUserBalance();
        }
    }, [userId]);

    useEffect(() => {
        const getGames = async () => {
            const response = await GameService.getAllGames();
            const games = await response.json();
            setGames(games);
        };
        getGames();

        fetchLibraryGames();
    }, [userId]);

    const fetchLibraryGames = async () => {
        if (userId) {
            try {
                const response = await LibraryService.getAllLibraryGames(userId);
                setLibraryGames(await response.json());
            } catch (error) {
                console.error('Error fetching library games:', error);
            }
        }
    };

    const updateBalance = async () => {
        const newBalance = await getBalance();
        const roundedBalance = Math.round(newBalance * 100) / 100;
        setBalance(roundedBalance);
    };

    useEffect(() => {
        const allCategories = Array.from(new Set(games.flatMap(game => game.categories)));
        setCategories(allCategories);
    }, [games]);

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

    const handlePurchase = async (game: Game) => {
        if (balance && userId) {
            const confirmPurchase = window.confirm('Are you sure you want to purchase this game?');
            if (confirmPurchase) {
                if (balance < game.price) {
                    window.alert('You do not have enough money in your balance.');
                } else {
                    await PurchaseService.newPurchase(userId, game.id);
                    await libraryService.addLibraryAchievements(userId);
                    await fetchLibraryGames();
                    updateBalance();
                }
            }
        }
    };

    return (
        <>
            <Head>
                <title>Setback | Store</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1 className={styles.title}>Setback Store</h1>
                </span>
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

                <StoreTable filterGames={filterGames} handlePurchase={handlePurchase} libraryGames={libraryGames}/>
            </main>
        </>
    );
};

export default Store;
