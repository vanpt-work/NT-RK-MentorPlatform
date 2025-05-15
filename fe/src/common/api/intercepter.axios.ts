import { getAccessToken, getRefreshToken, isLoginPage, removeClientToken, setClientToken } from "../lib/token";
import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { axiosInstance, axiosRetry } from "./instance.axios";
import type { Result } from "../types/result";
import { PATH } from "../constants/paths";
import { toast } from "sonner";

let isRefreshing = false;
let refreshTokenPromise: Promise<string | undefined> | null = null;

const authRequestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Interceptor request
axiosInstance.interceptors.request.use(authRequestInterceptor)
axiosRetry.interceptors.request.use(authRequestInterceptor)

axiosRetry.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("Refresh request failed:", error.message);
        return Promise.reject(error);
    }
);
// Interceptor response
axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError<Result<any>>) => {
        const originalRequest = error.config as AxiosRequestConfig;
        // const requestKey = `${originalRequest.method}:${originalRequest.url}`;
        if (!isLoginPage() && error.response && error.response.status === 401) {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                removeClientToken();
                window.location.href = PATH.Login;
                return Promise.reject(error);
            }
            if (!isRefreshing) {
                isRefreshing = true;
                // refreshTokenPromise = <call api get renew tokens>
            }
            try {
                const newAccessToken = await refreshTokenPromise!;
                if (originalRequest.headers)
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.log("RETRY THEN FAILURE")
                return Promise.reject(err);
            }
        }
        else {
            toast.error(error.response?.data?.errors || [error.message]);
        }
        return Promise.reject(error);
    }
);