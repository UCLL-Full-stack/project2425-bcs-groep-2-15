import { Library, Profile } from '@types';

const BASE_URL = 'http://localhost:3000';

const getAllUsers = async () => {
    return fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const getUserById = async (id: number) => {
    return fetch(`${BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const newUser = async (username: string, password: string, library: Library, profile: Profile, balance: number) => {
    return fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, balance, library, profile })
    })
};

const getUserBalance = async (id: number) => {
    return fetch(`${BASE_URL}/users/${id}/balance`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

const addUserBalance = async (id: number, amount: number) => {
    return fetch(`${BASE_URL}/users/${id}/balance`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
    });
};

const UserService = {
    getAllUsers,
    getUserById,
    newUser,
    getUserBalance,
    addUserBalance,
};

export default UserService;
