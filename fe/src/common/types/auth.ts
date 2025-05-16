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

export enum Role {
    Admin = 0,
    Learner = 1,
    Mentor = 2
}


export type CurrentUser = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl : string;
    role: Role;
}