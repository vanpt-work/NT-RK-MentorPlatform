import type { Role } from "@/modules/RegisterPage/types";

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type VerifyEmailRequest = {
    email: string;
    code: string;
};

export type RefreshTokenRequest = Token;

export type VerifyEmailResponse = Token;

export type RefreshTokenResponse = Token;

export type LoginResponse = Token & {
    isVerifyEmail: boolean;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type VerifyForgotPasswordRequest = {
    email: string;
    code: string;
};

export type ResendVerifyEmailRequest = {
    email: string;
};

export type CurrentUser = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl : string;
    role: Role;
};
