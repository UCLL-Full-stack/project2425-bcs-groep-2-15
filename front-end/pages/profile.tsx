import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/profile.module.css';
import React, { useEffect, useState } from 'react';
import { Game, Profile, User } from '@types';
import LibraryService from '@services/LibraryService';
import ProfileService from '@services/ProfileService';
import UserService from '@services/UserService';
import { getBalance } from './balance';
import { parse } from 'yaml';
import userService from '@services/UserService';
import ProfileInterface from '@components/profileInterface';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);

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
            }
        }
        fetchUserBalance();
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const [profileResponse, userResponse, gamesResponse] = await Promise.all([
                        ProfileService.getProfileById(userId!),
                        UserService.getUserById(userId!),
                        LibraryService.getAllLibraryGames(userId!)
                    ]);

                    setProfile(await profileResponse.json());
                    setUser(await userResponse.json());
                    setGames(await gamesResponse.json());
                } catch (err) {
                    setError('Failed to load data. Please try again later.');
                }
            }
        };

        fetchData();
    }, [userId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Setback | Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                <ProfileInterface  games={games} profile={profile} user={user}/>
            </main>
        </>
    );
};

export default Profile;