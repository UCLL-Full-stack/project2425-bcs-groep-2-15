import {Library} from '../model/library';
import {Profile} from '../model/profile';
import {Purchase} from './purchase';
import {Role} from "../types";

export class User {
    id: number;
    username: string;
    password: string;
    library: Library;
    profile: Profile;
    purchases: Purchase[];
    balance: number;
    role: Role;

    constructor(user: {
        id: number;
        username: string;
        password: string;
        library: Library;
        profile: Profile;
        purchases: Purchase[];
        balance: number;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.library = user.library;
        this.profile = user.profile;
        this.purchases = user.purchases;
        this.balance = user.balance;
        this.role = user.role;
    }

    getId(): number {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getLibrary(): Library {
        return this.library;
    }

    getProfile(): Profile {
        return this.profile;
    }

    getPurchases(): Purchase[] {
        return this.purchases;
    }

    getBalance(): number {
        return this.balance;
    }

    setBalance(balance: number) {
        this.balance = balance;
    }

    getRole(): string {
        return this.role.toString();
    }

    setRole(role: string) {
        if (Object.values(Role).includes(role as Role)) {
            this.role = role as Role;
        } else {
            throw new Error('Invalid role');
        }
    }

    validate(user: {
        id: number;
        username: string;
        password: string;
        library: Library;
        profile: Profile;
        purchases: Purchase[];
        balance: number;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.balance === undefined || isNaN(user.balance)) {
            throw new Error('Balance is required and must be a number');
        }
        if (!user.library) {
            throw new Error('Library is required');
        }
        if (!user.purchases) {
            throw new Error('Purchases are required');
        }
        if (!user.profile) {
            throw new Error('Profile is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.library === user.getLibrary() &&
            this.profile === user.getProfile() &&
            this.purchases === user.getPurchases() &&
            this.balance === user.getBalance() &&
            this.role === user.getRole()
        );
    }
}
