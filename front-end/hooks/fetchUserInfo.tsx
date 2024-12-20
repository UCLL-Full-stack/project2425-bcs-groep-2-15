import {useState, useEffect} from 'react';
import userService from "@services/UserService";

const fetchUserInfo = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [userBalance, setUserBalance] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchUserRole = async () => {
            const storedUserRole = await sessionStorage.getItem('role');
            if (storedUserRole) {
                setUserRole(storedUserRole);
            }
        };
        fetchUserRole();
    }, [userId]);

    useEffect(() => {
        if (userId !== null) {
            const fetchUserBalance = async () => {
                const user = await userService.getUserById(userId);
                const userJson = await user.json();
                if (userJson) {
                    setUserBalance(userJson.balance);
                }
            }
            fetchUserBalance();
        }
    }, [userId]);


    const refreshUserInfo = async () => {
        if (userId) {
            try {
                const userResponse = await userService.getUserById(userId);
                const userJson = await userResponse.json();
                if (userJson) {
                    setUserBalance(userJson.balance);
                }
            } catch (error) {
                console.error("Error refreshing user information:", error);
            }
        }
    };

    return { userId, userRole, userBalance, refreshUserInfo };
};

export default fetchUserInfo;
