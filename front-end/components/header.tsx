import Link from 'next/link';
import styles from '@styles/header.module.css';
import { useEffect, useState } from 'react';
import { Game } from '@types';
import LibraryService from '@services/LibraryService';
import UserService from '@services/UserService';

const userId = 1;

const Header: React.FC = () => {
    const [balance, setBalance] = useState<Number>();

    const fetchBalance = async () => {
        try {
            const response = await UserService.getUserById(userId);
            const userData = await response.json();
            setBalance(userData.balance.toFixed(2));
        } catch (error) {
            console.error("Error fetching user balance:", error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.logo}>
                    <img src={"/images/logo.png"} alt={"logo"} />
                </Link>
            </div>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link href="/store" className={styles.link}>
                        Store
                    </Link>
                    <Link href="/library" className={styles.link}>
                        Library
                    </Link>
                    <Link href="/profile" className={styles.link}>
                        Profile
                    </Link>
                </nav>
            </div>
            <div>
                <Link href="/balance" className={styles.balance}>
                    { `Balance: €${balance}` }
                </Link>
            </div>
        </header>
    );
};

export default Header;
