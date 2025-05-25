/* eslint-disable react-refresh/only-export-components */
import React, {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { ApplicationStatus } from "@/modules/AdminPage/MentorApprovalsPage/types";
import { applicationStatusService } from "@/modules/MentorPage/ApplicationStatusPage/services/applicationStatusService";

import { FullscreenLoading } from "../components/loading-spinner";
import { PATH } from "../constants/paths";
import {
    getAccessToken,
    getClientToken,
    getRefreshToken,
    isLoginPage,
    removeClientToken,
    setClientToken,
} from "../lib/token";
import authService from "../services/authServices";
import {
    type CurrentUser,
    type LoginRequest,
    Role,
    type Token,
    type VerifyEmailRequest,
    type VerifyEmailResponse,
} from "../types/auth";
import type { Result } from "../types/result";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: CurrentUser | undefined;
    setUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
    logout: () => void;
    login: (data: LoginRequest) => Promise<string>;
    loading: boolean;
    verify: (data: VerifyEmailRequest) => Promise<Result<VerifyEmailResponse>>;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: undefined,
    setUser: () => {},
    logout: () => {},
    login: async () => {
        return {} as string;
    },
    loading: false,
    verify: async () => {
        return {} as Result<VerifyEmailResponse>;
    },
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const accessToken = getClientToken();
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [user, setUser] = useState<CurrentUser>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || isLoginPage()) {
            setLoading(false);
            return;
        }
        getCurrentUser();
    }, []);

    const checkMentorApplicationStatus = async () => {
        const response =
            await applicationStatusService.getCurrentUserApplication();
        return response.data;
    };

    const logout = () => {
        const refreshToken = getRefreshToken();
        const accesshToken = getAccessToken();
        if (refreshToken || accesshToken) {
            authService.logout().finally(() => removeClientToken());
        }
        removeClientToken();
        setIsAuthenticated(false);
        setUser(undefined);
    };

    const login = async (data: LoginRequest): Promise<string> => {
        const res = await authService.login(data);
        if (res.data && res.data.isVerifyEmail == false) {
            return `${PATH.VerifyOTP}?email=${encodeURIComponent(data.email)}&purpose=login`;
        } else if (res.data && res.data.isVerifyEmail == true) {
            const token: Token = {
                accessToken: res.data?.accessToken ?? "",
                refreshToken: res.data?.refreshToken ?? "",
            };
            setClientToken(token);
            setIsAuthenticated(true);
            const userResponse = await authService.getCurrentUser();
            const currentUser = userResponse.data;
            setUser(currentUser);

            if (currentUser?.role === Role.Admin) {
                return PATH.AdminDashboard;
            } else if (currentUser?.role === Role.Learner) {
                return PATH.LearnerDashboard;
            } else if (currentUser?.role === Role.Mentor) {
                const applicationStatus = await checkMentorApplicationStatus();
                if (
                    applicationStatus &&
                    applicationStatus.status === ApplicationStatus.Approved
                ) {
                    return PATH.MentorDashboard;
                } else {
                    return PATH.MentorApplication;
                }
            }

            return PATH.Home;
        } else {
            return PATH.VerifyFailure;
        }
    };

    const verify = async (
        data: VerifyEmailRequest,
    ): Promise<Result<VerifyEmailResponse>> => {
        const res = await authService.verifyEmail(data);
        console.log(res);
        const token: Token = {
            accessToken: res.data?.accessToken ?? "",
            refreshToken: res.data?.refreshToken ?? "",
        };
        setClientToken(token);
        setIsAuthenticated(true);
        getCurrentUser();
        return res;
    };

    const getCurrentUser = async () => {
        authService
            .getCurrentUser()
            .then((res) => {
                console.log("user", res.data);
                setUser(res.data);
            })
            .catch(() => {
                removeClientToken();
                setUser(undefined);
                setIsAuthenticated(false);
            })
            .finally(() => setLoading(false));
    };

    const contextValue: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
        loading,
        verify,
    };
    return loading ? (
        <FullscreenLoading />
    ) : (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
