// Archivo: src/Auth/AuthContext.tsx

import React, { useState, useEffect, useContext, createContext } from "react";
import { IonSpinner } from "@ionic/react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    user: string | null;      
    name: string | null;     
    email: string | null;
    role: string | null;
    login: (token: string, user: string, name: string, email: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                const storedUser = localStorage.getItem("user");
                const storedName = localStorage.getItem("name");
                const storedEmail = localStorage.getItem("email");
                const storedRole = localStorage.getItem("role");

                if (storedToken && storedUser && storedName && storedEmail && storedRole) {
                    login(storedToken, storedUser, storedName, storedEmail, storedRole);
                }
            } catch (error) {
                console.error("Fallo al verificar la autenticación:", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    const login = (token: string, user: string, name: string, email: string, role: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        if (role === '1') role = 'Admin';
        else role = 'Usuario';

        localStorage.setItem("role", role);
        setToken(token);
        setUser(user);
        setName(name);
        setEmail(email);
        setRole(role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
        setName(null);
        setEmail(null);
        setRole(null);
        setIsAuthenticated(false);
    };

    const contextValues = {
        isAuthenticated,
        isLoading,
        token,
        user,
        name,
        email,
        role,
        login,
        logout
    };

    if (isLoading) {
        return <IonSpinner name="dots" className="ion-text-center" style={{ width: '100%', marginTop: '50%' }} />;
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};