import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, createContext, useEffect } from 'react';


export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authentificate: (token) => {},
    logout: () => {},
});

export default function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState();

  

    function authentificate(token) {

        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token', token);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authentificate: authentificate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}