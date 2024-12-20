import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import RegisterForm from '@components/login/registerForm';
import {User} from '@types';
import {useEffect, useState} from 'react';
import userService from '@services/UserService';
import UsersTable from '@components/login/usersTable';

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Setback | Register</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={null} userRole={null} userBalance={null} />
            <main className={styles.main}>
                <div>
                    <RegisterForm />
                </div>
            </main>
        </>
    );
};

export default Register;
