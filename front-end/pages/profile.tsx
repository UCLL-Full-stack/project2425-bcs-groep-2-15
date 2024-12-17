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

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileResponse, userResponse, gamesResponse] = await Promise.all([
                    ProfileService.getProfileById(userId),
                    UserService.getUserById(userId),
                    LibraryService.getAllLibraryGames(userId)
                ]);

                setProfile(await profileResponse.json());
                setUser(await userResponse.json());
                setGames(await gamesResponse.json());
            } catch (err) {
                setError('Failed to load data. Please try again later.');
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
            <Header balance={balance} />
            <main className={styles.main}>
                {/* <span>
                    <h1>Profile</h1>
                </span> */}
                <div className={styles.container}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                        <img
                            src={profile.profilePic}
                            alt="Profile picture"
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </div>
                    <div>
                        <h2>{user.username}</h2>
                        <p>{profile.description}</p>
                    </div>
                </div>

                <div style={{ marginTop: '5%' }}>
                    {/* <h2>Owned games:</h2> */}
                    <table className={styles.profileTable}>
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                </td>
                                <td>{game.title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </div>

            </main>
        </>
    );
};

export async function getServerSideProps() {
    const balance = await getBalance();

    return {
        props: { balance }
    };
}

export default Profile;