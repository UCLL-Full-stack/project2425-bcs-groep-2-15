// Execute: npx ts-node util/seed.ts

import {PrismaClient} from '@prisma/client';
import {User} from '../model/user';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.purchase.deleteMany();
    await prisma.user.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.gamesInLibraries.deleteMany();
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

    const libraryUser = await prisma.library.create({
        data: {
            achievements: 0,
            timePlayed: 0,
            GamesInLibraries: {}
        }
    });

    const libraryTester = await prisma.library.create({
        data: {
            achievements: 25,
            timePlayed: 600,
            GamesInLibraries: {
                create: [
                    { gameId: edenSword.id },
                    { gameId: nexus.id },
                    { gameId: snakeTriad.id },
                    { gameId: projectSalvo.id },
                    { gameId: projectSalvoSalvation.id }
                ]
            }
        }
    });

    const libraryAdmin = await prisma.library.create({
        data: {
            achievements: 0,
            timePlayed: 0,
            GamesInLibraries: {}
        }
    });

    const profileUser = await prisma.profile.create({
        data: {
            description: 'This is my profile.',
            profilePic: '/images/profile/2.png'
        }
    });

    const profileTester = await prisma.profile.create({
        data: {
            description: 'This is my profile.',
            profilePic: '/images/profile/4.png'
        }
    });

    const profileAdmin = await prisma.profile.create({
        data: {
            description: 'This is my profile.',
            profilePic: '/images/profile/3.png'
        }
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'User123',
            password: '1234',
            library: { connect: { id: libraryUser.id } },
            profile: { connect: { id: profileUser.id } },
            purchases: undefined,
            balance: 99.99,
            role: 'User'
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'Tester',
            password: '1234',
            library: { connect: { id: libraryTester.id } },
            profile: { connect: { id: profileTester.id } },
            purchases: undefined,
            balance: 99999,
            role: 'Tester'
        }
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'Admin',
            password: '1234',
            library: { connect: { id: libraryAdmin.id } },
            profile: { connect: { id: profileAdmin.id } },
            purchases: undefined,
            balance: 99999,
            role: 'Admin'
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