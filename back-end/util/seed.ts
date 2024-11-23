// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { Game } from '../model/game';
import { Library } from '../model/library';
import gameDb from '../repository/game.db';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import libraryDb from '../repository/library.db';
import profileDb from '../repository/profile.db';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.purchase.deleteMany();
    await prisma.user.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.library.deleteMany();
    await prisma.game.deleteMany();

    const edenSword = await prisma.game.create({
        data: {
            title: "Eden Sword",
            image: "/images/games/1_eden_sword.png",
            categories: ["Adventure", "RPG"],
            price: 59.99
        },
    });

    const nexus = await prisma.game.create({
        data: {
            title: "Nexus",
            image: "/images/games/2_nexus.png",
            categories: ["FPS", "Action"],
            price: 29.99
        },
    });

    const snakeTriad = await prisma.game.create({
        data: {
            title: "Snake Triad",
            image: "/images/games/3_snake_triad.png",
            categories: ["Fighting", "Action"],
            price: 39.99,
            discount: 10
        },
    });

    const projectSalvo = await prisma.game.create({
        data: {
            title: "Project Salvo",
            image: "/images/games/4_project_salvo.png",
            categories: ["Adventure", "RPG"],
            price: 39.99,
            discount: 25
        },
    });

    const projectSalvoSalvation = await prisma.game.create({
        data: {
            title: "Project Salvo: Salvation",
            image: "/images/games/5_project_salvo_salvation.png",
            categories: ["Adventure", "RPG"],
            price: 59.99
        },
    });

    const library1 = await prisma.library.create({
        data: {
            games: {
                connect: [
                    { id: edenSword.id },
                ]
            },
            achievements: 0,
            timePlayed: 0
        },
    });

    const profile1 = await prisma.profile.create({
        data: {
            description: "This is my profile.",
            profilePic: "/images/profile/2.png"
        },
    });

    const user1 = await prisma.user.create({
        data: {
            username: "User",
            password: "1234",
            library: { connect: { id: library1.id } },
            profile: { connect: { id: profile1.id } },
            purchases: undefined,
            balance: 99.99
        },
    });

    const purchase1 = await prisma.purchase.create({
        data: {
            date: "2024-09-23T12:00:00.000Z",
            cost: edenSword.price,
            user: { connect: { id: user1.id } },
            game: { connect: { id: edenSword.id } }
        },
    });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();