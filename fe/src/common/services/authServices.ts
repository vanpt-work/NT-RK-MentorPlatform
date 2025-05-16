import { httpClient } from "../api/instance.axios";
import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, UserInfo, VerifyEmailRequest, VerifyEmailResponse } from "../types/auth";

const authService = {
    login: (body: LoginRequest) => httpClient.post<LoginResponse>('auth/login', body),
    verifyEmail: (body: VerifyEmailRequest) => httpClient.post<VerifyEmailResponse>('auth/verify-email', body),
    getCurrentUser: () => httpClient.get<UserInfo>("auth/logout"),
    logout: () => httpClient.post("auth/logout"),
    getRefreshToken: (body: RefreshTokenRequest) => httpClient.post<RefreshTokenResponse>('auth/refresh-token', body),
};

export default authService;