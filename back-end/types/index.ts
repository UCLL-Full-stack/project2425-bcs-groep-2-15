import {Genre as PrismaGenre} from '@prisma/client';

enum Role {
    User = "User",
    Tester = "Tester",
    Admin = "Admin"
}

type UserInput = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export {
    Role,
    UserInput,
    AuthenticationResponse,
}

export type Genre = PrismaGenre;