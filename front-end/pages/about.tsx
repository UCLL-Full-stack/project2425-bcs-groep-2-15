import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Language from '@components/language';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={null} userRole={null} userBalance={null} />
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
