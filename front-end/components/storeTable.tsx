import React, { useEffect, useState } from 'react';
import { Game } from '@types';
import LibraryService from '@services/LibraryService';
import PurchaseService from '@services/PurchaseService';
import style from "../styles/store.module.css"
import { getBalance } from '../pages/balance';

interface StoreTableProps {
    games: Array<Game>;
    updateBalance: () => void;
}

const userId = 1;

const StoreTable: React.FC<StoreTableProps> = ({ games, updateBalance }) => {
    const [libraryGames, setLibraryGames] = useState<Game[]>([]);

    const fetchLibraryGames = async () => {
        try {
            const response = await LibraryService.getAllLibraryGames(userId);
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
            if (await getBalance() < game.price) {
                window.alert("You do not have enough money in your balance.")
            }
            else {
                await PurchaseService.newPurchase(userId, game.id);
                await fetchLibraryGames();
                updateBalance();
            }
        }
    };

    return (
        <>
            {games.length > 0 && (
                <table className={style.table}>
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => (
                        <tr key={index}>
                            <td className={style.image}>
                                <img
                                    src={game.image}
                                    alt={game.title}
                                />
                            </td>
                            <td className={style.titleAndCategories}>
                                <div className={style.title}>{game.title}</div>
                                <div className={style.categories}>{game.categories.join(', ')}</div>
                            </td>
                            <td className={style.discountColumn}>
                                {game.discount && game.discount > 0 ? (
                                    <span className={style.discount}>{`-${game.discount}%`}</span>
                                ) : (
                                    ''
                                )}
                            </td>
                            <td className={style.price}>€{game.price.toFixed(2)}</td>
                            <td className={style.purchaseColumn}>
                                {libraryGames?.some((ownedGame) => ownedGame.id === game.id) ? (
                                    <span className={style.purchasedButton}>Purchased</span>
                                ) : (
                                    <a href="#" onClick={() => handlePurchase(game)}
                                       className={style.purchaseButton}> Purchase </a>
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
