import { httpClient } from "../api/instance.axios";
import type { LoginRequest, Token, UserInfo, VerifyEmailRequest } from "../types/auth";

const authService = {
    login: (body: LoginRequest) => httpClient.post<boolean>('auth/login', body),
    verifyEmail: (body: VerifyEmailRequest) => httpClient.post<Token>('auth/verify-email', body),
    getCurrentUser: () => httpClient.get<UserInfo>("auth/logout"),
    logout: () => httpClient.post("auth/logout"),
    
};

export default authService;