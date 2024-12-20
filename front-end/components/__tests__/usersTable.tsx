import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UsersTable from '../../components/login/usersTable';

describe('UsersTable', () => {
    const mockUsers = [
        { username: 'user1', password: 'pass1', role: 'admin' },
        { username: 'user2', password: 'pass2', role: 'user' },
        { username: 'user3', password: 'pass3', role: 'user' },
        { username: 'user4', password: 'pass4', role: 'user' }
    ];

    it('renders table headers correctly', () => {
        render(<UsersTable users={mockUsers} />);

        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders only first 3 users from the array', () => {
        render(<UsersTable users={mockUsers} />);

        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
        expect(screen.getByText('user3')).toBeInTheDocument();

        expect(screen.queryByText('user4')).not.toBeInTheDocument();
    });

    it('renders correct user information in each row', () => {
        render(<UsersTable users={mockUsers} />);

        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('pass1')).toBeInTheDocument();
        expect(screen.getByText('admin')).toBeInTheDocument();

        expect(screen.getByText('user2')).toBeInTheDocument();
        expect(screen.getByText('pass2')).toBeInTheDocument();
        expect(screen.getAllByText('user')[0]).toBeInTheDocument();
    });

    it('renders empty table when no users provided', () => {
        render(<UsersTable users={[]} />);

        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1);
    });

    it('renders table with CSS classes', () => {
        render(<UsersTable users={mockUsers} />);

        const table = screen.getByRole('table');
        expect(table).toHaveClass('table', 'table-hover');
    });

    it('renders each row with unique key', () => {
        render(<UsersTable users={mockUsers} />);

        const rows = screen.getAllByRole('row');
        const dataRows = rows.slice(1);

        expect(dataRows).toHaveLength(3);
    });
});