import React, { useEffect, useState } from 'react';
import { Game } from '@types';
import LibraryService from '@services/LibraryService';

interface StoreTableProps {
    games?: Array<Game>;
}

const StoreTable: React.FC<StoreTableProps> = ({ games = [] }) => {
    const [libraryGames, setLibraryGames] = useState<Game[]>([]);

    const fetchLibraryGames = async () => {
        try {
            const response = await LibraryService.getAllLibraryGames();
            setLibraryGames(await response.json());
        } catch (error) {
            console.error("Error fetching library games:", error);
        }
    };

    useEffect(() => {
        fetchLibraryGames();
    }, []);

    const handlePurchase = async (game: Game) => {
        const confirmPurchase = window.confirm("Are you sure you want to purchase this game?");
        if (confirmPurchase) {
            await LibraryService.addGameToLibrary(game);
            await fetchLibraryGames();
        }
    };

    return (
        <>
            {games.length > 0 && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Categories</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            </td>
                            <td>{game.title}</td>
                            <td>{game.categories.join(', ')}</td>
                            <td>{game.discount}%</td>
                            <td>€{game.price.toFixed(2)}</td>
                            <td>
                                {libraryGames?.some((ownedGame) => ownedGame.id === game.id) ? (
                                    <span>Purchased</span>
                                ) : (
                                    <a href="#" onClick={() => handlePurchase(game)}>PURCHASE</a>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default StoreTable;
