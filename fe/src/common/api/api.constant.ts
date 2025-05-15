import type { CreateAxiosDefaults } from "axios";

export const ROOT_API: CreateAxiosDefaults = {
    baseURL: "http://localhost:5196/api",
    headers: {
        'Content-type': 'application/json',
    }
}