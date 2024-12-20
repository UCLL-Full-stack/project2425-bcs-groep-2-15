import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/profile.module.css';
import React, {useEffect, useState} from 'react';
import {Game, Profile, User} from '@types';
import LibraryService from '@services/LibraryService';
import ProfileService from '@services/ProfileService';
import UserService from '@services/UserService';
import userService from '@services/UserService';
import ProfileInterface from '@components/profile/profileInterface';
import EditProfileInterface from '@components/profile/editProfileInterface';
import fetchUserInfo from "../hooks/fetchUserInfo";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);
    const { userId, userRole, userBalance } = fetchUserInfo();

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

    const updateProfile = async (profilePic: string, description: string) => {
        setEditProfileVisible(false);
        try {
            await ProfileService.updateProfile(userId!, profilePic, description);
            setProfile((prevProfile) => ({
                ...prevProfile!,
                profilePic,
                description
            }));
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    }

    return (
        <>
            <Head>
                <title>Setback | Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
            <main className={styles.main}>
                <ProfileInterface  games={games} profile={profile} user={user} setEditProfileVisible={setEditProfileVisible}/>
                { editProfileVisible && (
                    <EditProfileInterface userId={userId} profile={profile} updateProfile={updateProfile}/>
                )}
            </main>
        </>
    );
};

export default Profile;