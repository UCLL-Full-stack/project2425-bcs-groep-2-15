import {Library, Profile} from '@types';

const BASE_URL = 'http://localhost:3000';

const getAllUsers = async () => {
    return fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getUserById = async (id: number) => {
    return fetch(`${BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getUserByUsername = async (username: string) => {
    return fetch(`${BASE_URL}/users/name/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const newUser = async (username: string, password: string) => {
    return fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
};

const login = async (username: string, password: string, role: string) => {
    const user = await getUserByUsername(username);
    const userJson = await user.json();
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("id", userJson.id);
    sessionStorage.setItem("role", role);

    return fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            role
        }),
    });
};

const getUserBalance = async (id: number) => {
    return fetch(`${BASE_URL}/users/${id}/balance`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const addUserBalance = async (id: number, amount: number) => {
    return fetch(`${BASE_URL}/users/${id}/balance`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
    });
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    newUser,
    login,
    getUserBalance,
    addUserBalance,
};

export default UserService;
