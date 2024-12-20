import React from 'react';
import {User} from '@types';

type AdminPanelProps = {
    users: User[];
    selectUser: (user: User) => void;
};

const AdminPanel: React.FC<AdminPanelProps> = ({ users, selectUser }) => {
    return (
        <>
            <h1 className="title">= ADMIN INTERFACE =</h1>
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            onClick={() => selectUser(user)}
                            role="button"
                        >
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            { user.role === "Admin" || user.role === "Tester" ? (
                                <td>∞</td>
                            ) : (
                                <td>{user.balance}</td>
                            )}
                            <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminPanel;
