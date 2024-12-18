import React, { useEffect, useState } from 'react';
import styles from '@styles/login.module.css';
import { useRouter } from 'next/router';
import UserService from '@services/UserService';

interface LogoutConfirmationProps {
    onLogout: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({ onLogout }) => {
    const [error, setError] = useState("");
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = sessionStorage.getItem("id");
            if (storedUserId) {
                const id = Number(storedUserId);
                setUserId(id);

                try {
                    const user = await UserService.getUserById(id);
                    const userJson = await user.json();
                    if (userJson) {
                        setBalance(userJson.balance);
                    }
                } catch {
                    setError("Failed to fetch user balance");
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("id");
            setBalance(null);
            setUserId(null);
            onLogout();
            await router.push("/");
        } catch {
            setError("An unexpected error occurred during logout.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Are you sure you want to log out?</h1>
            <button onClick={handleLogout} className={styles.submitButton}>
                Yes
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default LogoutConfirmation;
