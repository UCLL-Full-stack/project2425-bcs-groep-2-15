import { Game, Purchase, User } from '@types';
import styles from '@styles/login.module.css';

interface userGamesTableProps {
    purchases: Purchase[]
}

const userPurchasesTable: React.FC<userGamesTableProps> = ({ purchases }) => {
    return (
        <div className={styles.table}>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Purchases</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {purchases.map((purchase, index) => (
                    <tr key={index}>
                        <td>{purchase.id}</td>
                        <td>{new Date(purchase.date).toLocaleString()}</td>
                        <td>€{purchase.cost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default userPurchasesTable;
