import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import userService from '@services/UserService';
import { Game, User } from '@types';
import AdminPanel from '@components/index/adminPanel';
import WelcomeMessage from '@components/index/welcomeMessage';
import LibraryTable from '@components/libraryTable';
import libraryService from '@services/LibraryService';
import UserGamesTable from '@components/index/userGamesTable';
import SelectedUser from '@components/index/selectedUser';

const Home: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [username, setUsername] = useState<number | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserGames, setSelectedUserGames] = useState<Game[]>([]);
    const [role, setRole] = useState<string>("User");

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();

        if (userId) {
            const fetchUserBalance = async () => {
                const user = await userService.getUserById(userId!);
                const userJson = await user.json();
                if (userJson) {
                    setBalance(userJson.balance);
                }
            }
            fetchUserBalance();

            const fetchRole = async () => {
                const role = await sessionStorage.getItem('role');
                if (role) {
                    setRole(role);
                }
            }
            fetchRole();

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
            const fetchSUG = async () => {
                const userGames = await libraryService.getAllLibraryGames(selectedUser!.id);
                const userGamesJson = await userGames.json();
                setSelectedUserGames(userGamesJson)
            }

            fetchSUG();
        }
    }, [selectedUser]);

    return (
        <>
            <Head>
                <title>Setback | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                {userId === null ? (
                    <WelcomeMessage />
                ) : role === "Admin" ? (
                    <AdminPanel users={users} selectUser={setSelectedUser} />
                ) : (
                    <>
                        <h1 className={styles.title}>Welcome to Setback, {username}.</h1>
                        <h3 className={styles.subtitle}>New to Setback? Learn more <a href={"/about"}>here.</a></h3>
                    </>
                )}

                {selectedUser && selectedUserGames && (
                    <SelectedUser selectedUser={selectedUser} selectedUserGames={selectedUserGames} />
                )}
            </main>
        </>
    );
};

export default Home;
