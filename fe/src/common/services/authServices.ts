import { httpClient } from "../api/instance.axios";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

const authService = {
    login: (body: LoginRequest) => httpClient.post<LoginResponse>('auth/login', body),
    register: (body: RegisterRequest) => httpClient.post<string>('auth/register', body),
    logout: () => httpClient.post("auth/logout")

};

export default authService;