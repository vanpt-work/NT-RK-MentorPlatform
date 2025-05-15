export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
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
