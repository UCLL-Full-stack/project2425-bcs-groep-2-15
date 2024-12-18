import { Game, User } from '@types';
import styles from '@styles/login.module.css';

interface userGamesTableProps {
    games: Game[];
}

const userGamesTable: React.FC<userGamesTableProps> = ({ games }) => {
    return (
        <div className={styles.table}>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Owned games:</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game, index) => (
                    <tr key={index}>
                        <td>{game.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default userGamesTable;
