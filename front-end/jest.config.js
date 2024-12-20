module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        // Handle CSS imports (without CSS modules)
        '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/services/(.*)$': '<rootDir>/services/$1',
        '^@styles/(.*)$': '<rootDir>/styles/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};