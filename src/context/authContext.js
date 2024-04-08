import { createContext, useState, useContext, useEffect } from "react";
import { verificarToken } from "../services/inicio-sesion.service";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const signin = async (data) => {
        setIsAuthenticated(true);
        setUser(data);
    }

    
    const logout = async () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {        
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const resp = await verificarToken(cookies.token);
                if (!resp) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(resp);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }
        checkLogin();
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{
            signin,
            logout,
            user,
            isAuthenticated,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );

}