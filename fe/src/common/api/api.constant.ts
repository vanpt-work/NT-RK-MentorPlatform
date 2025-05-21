import type { CreateAxiosDefaults } from "axios";

export const ROOT_API: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL_ROOT,
};
