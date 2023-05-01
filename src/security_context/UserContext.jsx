import { createContext, useState, useEffect } from 'react';

// Create a UserContext using createContext
export const UserContext = createContext(null);

// UserProvider component to wrap children components and provide context
export function UserProvider({ children }) {
    // Initialize state variable for permissions
    const [permissions, setPermissions] = useState([]);

    // Fetch permissions on component mount
    useEffect(() => {
        fetchPermissions();
    }, []);

    // Asynchronous function to fetch permissions from the API
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

    // Render the UserContext.Provider with the fetched permissions and fetchPermissions function
    return (
        <UserContext.Provider value={{ permissions, fetchPermissions }}>
            {children}
        </UserContext.Provider>
    );
}
