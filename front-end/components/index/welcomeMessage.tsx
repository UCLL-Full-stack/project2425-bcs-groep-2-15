import React from 'react';
import styles from '@styles/home.module.css';

const WelcomeMessage: React.FC = () => (
    <>
        <h1 className={styles.title}>Welcome to Setback.</h1>
        <div className={styles.description}>
            <h2><a href="/login">Log in here</a> to access the platform.</h2>
        </div>
    </>
);

export default WelcomeMessage;
