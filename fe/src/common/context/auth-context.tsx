/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Result } from "../types/result";
import { getClientToken, getRefreshToken, isLoginPage, removeClientToken, setClientToken } from "../lib/token";
import authService from "../services/authServices";
import type { LoginRequest, Token, UserInfo, VerifyEmailRequest, VerifyEmailResponse } from "../types/auth";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserInfo | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>
    logout: () => void
    login: (data: LoginRequest) => Promise<string>;
    loading: boolean;
    verify: (data: VerifyEmailRequest) => Promise<Result<VerifyEmailResponse>>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    user: undefined,
    setUser: () => { },
    logout: () => { },
    login: async () => { return {} as string;},
    loading: false,
    verify: async () => { return {} as Result<VerifyEmailResponse>; },
})

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const accessToken = getClientToken();
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [user, setUser] = useState<UserInfo>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || isLoginPage()) {
            setLoading(false);
            return;
        };
        authService.getCurrentUser().then(res => {
            setUser(res.data)
        }).catch(() => {
            removeClientToken();
            setUser(undefined)
            setIsAuthenticated(false)
        }).finally(() => setLoading(false))
    }, []);

    const logout = () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            authService.logout().finally(() => removeClientToken());
        }
        // location.href = PATH.Login;
        setIsAuthenticated(false);
        setUser(undefined);
    };

    const login =  async (data: LoginRequest) : Promise<string> => {
        console.log("OKOKOK")
        const res = await authService.login(data);
        if(res.data && res.data.isVerifyEmail == true){
             return '/verify-email';
        }
        else{
            return '/verify-failure';
        }
       
    };

    const verify = async (data: VerifyEmailRequest): Promise<Result<VerifyEmailResponse>> => {
        const res = await authService.verifyEmail(data);
        const token: Token = {
            accessToken: res.data?.accessToken ?? "",
            refreshToken: res.data?.refreshToken ?? "",
        };
        setClientToken(token);
        setIsAuthenticated(true);
        return res;
    };


    const contextValue: AuthContextType = { isAuthenticated, setIsAuthenticated, user, setUser, login, logout, loading, verify };
    return (loading ? <div>Loading....</div> : <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
}

export default AuthProvider;