import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/login.module.css';
import UserService from '@services/UserService';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
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
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const user = await UserService.getUserByUsername(username);
            const userJson = await user.json();
            if (userJson) {
                setError(`User with username ${username} already exists.`);
                return;
            }

            const response = await UserService.newUser(username, password);
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "An unexpected error occurred");
            } else {
                const data = await response.json();
                sessionStorage.setItem("authToken", data.token);
                sessionStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));
                await router.push("/login");
            }
        } catch (error) {
            setError("Error in registration");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.loginForm} onSubmit={handleRegister}>
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
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Register
                </button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
            <p style={{ marginTop: "1rem", marginBottom: "0rem" }}>Already have an account? <a href={"/login"} style={{ color: '#5bc4f9' }}>Click here</a> to log in.</p>
        </div>
    );
};

export default RegisterForm;
