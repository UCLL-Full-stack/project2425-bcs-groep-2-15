import { User } from '@types';
import styles from '@styles/login.module.css';

interface usersTableProps {
    users: User[];
}

const usersTable: React.FC<usersTableProps> = ({ users }) => {
    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr className={styles.td} key={index}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default usersTable;
