import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import {useEffect, useState} from 'react';
import userService from '@services/UserService';
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Language from '@components/language';

const About: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const { t } = useTranslation();

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
        }
    }, [userId]);

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={null} balance={balance} />
            <main className={styles.main}>
                <h1 className={styles.title}>{t('title')}</h1>
                <h3 className={styles.subsubtitle} style={{marginBottom: '2rem'}}>
                    {t('description')}
                </h3>
                <Language/>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => { (context)
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    };
}

export default About;
