import React, {useEffect, useState} from 'react';
import {Game} from '@types';
import gameService from '@services/GameService';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Header from '@components/header';
import userService from '@services/UserService';
import styles from '@styles/home.module.css';
import StoreGame from '@components/store/storeGame';
import fetchUserInfo from '../../hooks/fetchUserInfo';

const GameDetails: React.FC = () => {
    const router = useRouter();
    const { gameId } = router.query;
    const [game, setGame] = React.useState<Game>();
    const { userId, userRole, userBalance, refreshUserInfo } = fetchUserInfo();

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
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
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
