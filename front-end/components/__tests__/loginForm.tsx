import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import LoginForm from '../login/loginForm';
import UserService from '../../services/UserService';

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

// Mock UserService
jest.mock('../../services/UserService', () => ({
    getUserByUsername: jest.fn(),
    login: jest.fn()
}));

// Mock sessionStorage
const mockSessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage
});

describe('LoginForm', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup router mock
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        });
    });

    it('renders login form with all elements', () => {
        render(<LoginForm />);

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText(/no account yet?/i)).toBeInTheDocument();
        expect(screen.getByText(/click here/i)).toHaveAttribute('href', '/register');
    });

    it('handles successful login correctly', async () => {
        const mockUser = { username: 'testuser', role: 'user' };
        const mockToken = 'test-token';

        // Mock successful API responses
        (UserService.getUserByUsername as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockUser)
        });

        (UserService.login as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ token: mockToken, ...mockUser })
        });

        render(<LoginForm />);

        // Fill in form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: mockUser.username }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'testpass' }
        });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            // Check if UserService methods were called
            expect(UserService.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
            expect(UserService.login).toHaveBeenCalledWith(
                mockUser.username,
                'testpass',
                mockUser.role
            );

            // Verify sessionStorage was updated
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('authToken', mockToken);
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
                'user',
                JSON.stringify(mockUser)
            );

            // Verify navigation occurred
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('handles invalid credentials correctly', async () => {
        // Mock failed API response
        (UserService.getUserByUsername as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(null)
        });

        render(<LoginForm />);

        // Fill in form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'wronguser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpass' }
        });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText('Username or password is invalid')).toBeInTheDocument();
        });
    });

    it('handles API error correctly', async () => {
        const errorMessage = 'Invalid credentials';

        // Mock successful user fetch but failed login
        (UserService.getUserByUsername as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ username: 'testuser', role: 'user' })
        });

        (UserService.login as jest.Mock).mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ error: errorMessage })
        });

        render(<LoginForm />);

        // Fill in form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpass' }
        });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});