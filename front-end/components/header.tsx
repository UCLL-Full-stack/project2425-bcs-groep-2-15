import Link from 'next/link';
import styles from '@styles/header.module.css';

interface HeaderProps {
    balance: number | null;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.logo}>
                    <img src={'/images/logo.png'} alt={'logo'} />
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
                    <Link href="/login" className={styles.link}>
                        Login
                    </Link>
                </nav>
            </div>
            <div>
                {balance != null ? (
                    <Link href="/balance" className={styles.balance}>
                        {`Balance: €${balance}`}
                    </Link>
                ) : (
                    <span className={styles.balance}>Balance: NaN</span>
                )}
            </div>
        </header>
    );
};

export default Header;
