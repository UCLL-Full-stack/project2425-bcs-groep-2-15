import Link from 'next/link';
import styles from '@styles/header.module.css';

interface HeaderProps {
    userId: number | null;
    userRole: string | null;
    userBalance: number | null;
}

const Header: React.FC<HeaderProps> = ({ userId, userRole, userBalance }) => {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.logo}>
                    <img src={'/images/logo.png'} alt={'logo'} />
                </Link>
            </div>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    {userId != null ? (
                        <>
                            <Link href="/store" className={styles.link}>
                            Store</Link>
                            <Link href="/library" className={styles.link}>
                            Library</Link>
                            <Link href="/profile" className={styles.link}>
                            Profile</Link>
                            <Link href="/logout" className={styles.link}>
                                Log out
                            </Link>
                        </>
                    ) : null}
                </nav>
            </div>
            <div>
                
                <Link href="/balance" className={styles.balance}>
                    {userId == null ? null : userRole == "Admin" || userRole == "Tester" ? `Balance: ∞` : `Balance: €${userBalance}`}
                </Link>
            </div>
        </header>
    );
};

export default Header;
