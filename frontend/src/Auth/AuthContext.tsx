import React, { useState, useEffect, useContext, createContext } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: string | null;
    role: string | null;
    login: (token: string, user: string, pass: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const role = localStorage.getItem("role");
        if (token && user && role) {
            login(token, user, role);
        }
    }, []);

    const login = (token: string, user: string, role: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role);
        setToken(token);
        setUser(user);
        setRole(role);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setToken(null);
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
    }

    const contextValues = {
        isAuthenticated,
        token,
        user,
        role,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValues}>
            { children }
        </AuthContext.Provider>
    );
};