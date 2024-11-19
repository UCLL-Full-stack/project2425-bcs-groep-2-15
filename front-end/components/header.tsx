import Link from 'next/link';
import styles from '@styles/header.module.css';

interface HeaderProps {
    balance: number;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
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
