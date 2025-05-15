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

export type VerifyEmailResponse = {
    accessToken: string;
    refreshToken: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};


export enum Role {
    Admin = 0,
    Learner = 1,
    Mentor = 2
}


export type UserInfo = {
    id: string;
    name: string;
    email: string;
    role: Role;
}