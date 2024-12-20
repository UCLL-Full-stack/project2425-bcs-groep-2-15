import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import React, {useEffect, useState} from 'react';
import userService from '@services/UserService';
import {Purchase, User} from '@types';
import AdminPanel from '@components/index/adminPanel';
import WelcomeMessage from '@components/index/welcomeMessage';
import SelectedUser from '@components/index/selectedUser';
import purchaseService from '@services/PurchaseService';
import fetchUserInfo from "../hooks/fetchUserInfo";

const Home: React.FC = () => {
    const [username, setUsername] = useState<number | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserPurchases, setSelectedUserPurchases] = useState<Purchase[]>([]);
    const { userId, userRole, userBalance } = fetchUserInfo();

    useEffect(() => {
        if (userId) {
            const fetchUsername = async () => {
                const user = await userService.getUserById(userId!);
                const userJson = await user.json();
                if (userJson) {
                    setUsername(userJson.username);
                }
            }
            fetchUsername();
        }

        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const usersListJson = await response.json();
                setUsers(usersListJson);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [userId]);

    useEffect(() => {
        if (selectedUser) {
            const fetchUserPurchases = async () => {
                const userPurchases = await purchaseService.getPurchasesOfUser(selectedUser.id!);
                const userPurchasesJson = await userPurchases.json();
                setSelectedUserPurchases(userPurchasesJson)
            }

            fetchUserPurchases();
        }
    }, [selectedUser]);

    return (
        <>
            <Head>
                <title>Setback | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
            <main className={styles.main}>
                {userId === null ? (
                    <WelcomeMessage />
                ) : userRole === "Admin" ? (
                    <AdminPanel users={users} selectUser={setSelectedUser} />
                ) : (
                    <>
                        <h1 className={styles.title}>Welcome to Setback, {username}.</h1>
                        <h3 className={styles.subtitle}>New to Setback? Learn more <a style={{ color: '#5bc4f9' }} href={"/about"}>here.</a></h3>
                    </>
                )}

                {selectedUser && selectedUserPurchases && (
                    <SelectedUser selectedUser={selectedUser} selectedUserPurchases={selectedUserPurchases}/>
                )}
            </main>
        </>
    );
};

export default Home;
