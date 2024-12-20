import {User} from '@types';

interface usersTableProps {
    users: User[];
}

const usersTable: React.FC<usersTableProps> = ({ users }) => {
    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.slice(0, 3).map((user, index) => (
                    <tr key={index}>
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
