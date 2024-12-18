import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import LoginForm from '@components/loginForm';
import { User } from '@types';
import { useEffect, useState } from 'react';
import userService from '@services/UserService';
import UsersTable from '@components/usersTable';

const Login: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
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
    }, []);

    const handleLoginSuccess = () => {
        console.log("User logged in successfully!");
    };

    return (
        <>
            <Head>
                <title>Setback | Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={null} balance={null} />
            <main className={styles.main}>
                <div>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                    <UsersTable users={users}/>
                </div>
            </main>
        </>
    );
};

export default Login;
