import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import React, { useEffect, useState } from 'react';
import { Game, Profile, User } from '@types';
import LibraryService from '@services/LibraryService';
import ProfileService from '@services/ProfileService';
import UserService from '@services/UserService';

const userId = 1;

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>();
    const [user, setUser] = useState<User>();
    const [games, setGames] = useState<Array<Game>>([]);

    const getProfile = async () => {
        const response = await ProfileService.getProfileById(userId);
        const profile = await response.json();
        setProfile(profile);
    }

    const getUser = async () => {
        const response = await UserService.getUserById(userId);
        const user = await response.json();
        setUser(user);
    }

    const getGames = async () => {
        const response = await LibraryService.getAllLibraryGames(userId);
        const games = await response.json();
        setGames(games);
    }

    useEffect(() => {
            getProfile()
            getUser()
            getGames()
        },
        []
    )

    if (!profile) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Setback | Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <h1>Profile</h1>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                        <img
                            src={profile.profilePic}
                            alt="Profile picture"
                            style={{ width: '250px', height: 'auto' }}
                        />
                    </div>
                    <div>
                        <h2>{user.username}</h2>
                        <p>{profile.description}</p>
                    </div>
                </div>

                <div style={{ marginTop: '5%' }}>
                    <h2>Owned games:</h2>
                    <table className="table table-hover">
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
            </main>
        </>
    )
}

export default Profile;