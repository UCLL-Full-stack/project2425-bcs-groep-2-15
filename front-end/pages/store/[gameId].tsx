import React, { useEffect, useState } from 'react';
import { Game } from '@types';
import gameService from '@services/GameService';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/header';
import userService from '@services/UserService';
import styles from '@styles/home.module.css';
import StoreTable from '@components/store/storeTable';
import StoreGame from '@components/store/storeGame';
import PurchaseService from '@services/PurchaseService';

const GameDetails: React.FC = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [game, setGame] = React.useState<Game>();
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();

        const fetchUserBalance = async () => {
            const user = await userService.getUserById(userId!);
            const userJson = await user.json();
            if (userJson) {
                setBalance(userJson.balance);
                setUserRole(userJson.role);
            }
        }
        fetchUserBalance();

        if (userId) {
            const fetchUserRole = async () => {
                const response = await userService.getUserById(userId!);
                const userJson = await response.json();
                setUserRole(userJson.role);
            }
            fetchUserRole();
        }
    }, [userId]);

    useEffect(() => {
        if (gameId) {
            const fetchGame = async () => {
                const gameQuery = await gameService.getGameById(String(gameId));
                const gameJson = await gameQuery.json();
                setGame(gameJson);
            }
            fetchGame();
        }
    }, [gameId]);

    const handleDeleteGame = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this game?');
        if (confirmDelete) {
            await gameService.deleteGame(String(gameId));
            await router.push("/store")
        }
    }

    return (
        <>
            <Head>
                <title>Setback | Store</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                {game && (
                    <StoreGame game={game}/>
                )}
                { userRole === "Tester" ? (
                    <button className={styles.deleteGameButton} onClick={handleDeleteGame}>DELETE GAME</button>
                ) : null};
            </main>
        </>
    );
};

export default GameDetails;
