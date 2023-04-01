import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/permissions', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setPermissions(data.permission);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{ permissions, fetchPermissions }}>
            {children}
        </UserContext.Provider>
    );
}
