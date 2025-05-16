import { httpClient } from "../api/instance.axios";
import type { CurrentUser, ForgotPasswordRequest, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, RegisterRequest, ResendVerifyEmailRequest, VerifyEmailRequest, VerifyEmailResponse, VerifyForgotPasswordRequest } from "../types/auth";

const authService = {
    login: (body: LoginRequest) => httpClient.post<LoginResponse>('auth/login', body),
    verifyEmail: (body: VerifyEmailRequest) => httpClient.post<VerifyEmailResponse>('auth/verify-email', body),
    getCurrentUser: () => httpClient.get<CurrentUser>("auth/me"),
    logout: () => httpClient.post("auth/logout"),
    getRefreshToken: (body: RefreshTokenRequest) => httpClient.post<RefreshTokenResponse>('auth/refresh-token', body),
    resendVerifyEmail: (body: ResendVerifyEmailRequest) => httpClient.post('auth/resend-verify-email', body),
};

export default authService;