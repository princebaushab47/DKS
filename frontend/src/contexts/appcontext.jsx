"use client"
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            try {
                // Try to decode JWT, fallback to JSON.parse for legacy support
                let userData;
                try {
                    userData = jwtDecode(storedUser);
                    userData.token = storedUser;
                } catch (jwtErr) {
                    // fallback: treat as plain object if not a JWT
                    userData = null;
                }
                setUser(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AppContext.Provider value={{user, setUser, logout}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
