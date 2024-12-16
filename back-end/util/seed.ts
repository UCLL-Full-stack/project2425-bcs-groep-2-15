// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import { User } from '../model/user';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.purchase.deleteMany();
    await prisma.user.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.library.deleteMany();
    await prisma.game.deleteMany();

    const edenSword = await prisma.game.create({
        data: {
            title: 'Eden Sword',
            image: '/images/games/1_eden_sword.png',
            categories: ['Adventure', 'RPG'],
            price: 59.99
        }
    });

    const nexus = await prisma.game.create({
        data: {
            title: 'Nexus',
            image: '/images/games/2_nexus.png',
            categories: ['FPS', 'Action'],
            price: 29.99
        }
    });

    const snakeTriad = await prisma.game.create({
        data: {
            title: 'Snake Triad',
            image: '/images/games/3_snake_triad.png',
            categories: ['Fighting', 'Action'],
            price: 39.99,
            discount: 10
        }
    });

    const projectSalvo = await prisma.game.create({
        data: {
            title: 'Project Salvo',
            image: '/images/games/4_project_salvo.png',
            categories: ['Adventure', 'RPG'],
            price: 39.99,
            discount: 25
        }
    });

    const projectSalvoSalvation = await prisma.game.create({
        data: {
            title: 'Project Salvo: Salvation',
            image: '/images/games/5_project_salvo_salvation.png',
            categories: ['Adventure', 'RPG'],
            price: 59.99
        }
    });

    const library1 = await prisma.library.create({
        data: {
            achievements: 0,
            timePlayed: 0,
            GamesInLibraries: {}
        }
    });

    const profile1 = await prisma.profile.create({
        data: {
            description: 'This is my profile.',
            profilePic: '/images/profile/2.png'
        }
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'User',
            password: '1234',
            library: { connect: { id: library1.id } },
            profile: { connect: { id: profile1.id } },
            purchases: undefined,
            balance: 99.99,
            role: 'User'
        }
    });
};

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