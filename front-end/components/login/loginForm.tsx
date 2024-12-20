import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@styles/login.module.css';
import UserService from '@services/UserService';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username) {
            setError("Username is required");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            const user = await UserService.getUserByUsername(username);
            const userJson = await user.json();
            if (!userJson) {
                setError("Username or password is invalid");
                return;
            }

            const response = await UserService.login(username, password, userJson.role);
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "An unexpected error occurred");
            } else {
                const data = await response.json();
                sessionStorage.setItem("authToken", data.token);
                sessionStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));
                await router.push("/");
            }
        } catch (error) {
            setError("Username or password is invalid");
        }
    };


    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Login
                </button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
            <p style={{marginTop: "1rem", marginBottom: "0rem"}}>No account yet? <a href={"/register"} style={{ color: '#5bc4f9' }}>Click here</a> to register.</p>
        </div>
    );
};

export default LoginForm;
