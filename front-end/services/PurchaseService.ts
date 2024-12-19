const BASE_URL = 'http://localhost:3000';

const getAllPurchases = async () => {
    return fetch(`${BASE_URL}/purchases`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getPurchasesOfUser = async (userId: number) => {
    return fetch(`${BASE_URL}/purchases/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getPurchaseById = async (id: number) => {
    return fetch(`${BASE_URL}/purchases/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const newPurchase = async (userId: number, gameId: number) => {
    return fetch(`${BASE_URL}/purchases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, gameId })
    });
};

const PurchaseService = {
    getAllPurchases,
    getPurchasesOfUser,
    getPurchaseById,
    newPurchase
};

export default PurchaseService;
