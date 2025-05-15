/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROOT_API } from "./api.constant";
import type { Result } from "../types/result";
import { authRequestInterceptor } from "./intercepter.axios";
import { getAccessToken, getRefreshToken, isLoginPage, removeClientToken, setClientToken } from "../lib/token";
import { PATH } from "../constants/paths";
import { handleErrorApi } from "../lib/toast-message";
import authService from "../services/authServices";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";



const axiosInstance = axios.create(ROOT_API);
const axiosRetry = axios.create(ROOT_API);


// Interceptor request
axiosInstance.interceptors.request.use(authRequestInterceptor)
axiosRetry.interceptors.request.use(authRequestInterceptor)

//Intercaptor response
axiosRetry.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("Refresh request failed:", error.message);
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshTokenPromise: Promise<string | undefined> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError<Result<any>>) => {
        const originalRequest = error.config as AxiosRequestConfig;
        // const requestKey = `${originalRequest.method}:${originalRequest.url}`;
        if (!isLoginPage() && error.response && error.response.status === 401) {
            const refreshToken = getRefreshToken();
            const accessToken = getAccessToken();
            if (!refreshToken || !accessToken) {
                removeClientToken();
                window.location.href = PATH.Login;
                return Promise.reject(error);
            }
            if (!isRefreshing) {
                isRefreshing = true;
                refreshTokenPromise = authService.getRefreshToken({ accessToken, refreshToken })
                    .then((res) => {
                        const newAccessToken = res.data!.accessToken;
                        const newRefreshToken = res.data!.refreshToken;
                        setClientToken({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                        console.log("RETRY Original SUCCESS:")
                        return newAccessToken;
                    })
                    .catch((err) => {
                        console.log("RETRY TOKEN FAILURE")
                        removeClientToken();
                        window.location.href = PATH.Login;
                        throw err;
                    })
                    .finally(() => {
                        isRefreshing = false;
                        refreshTokenPromise = null;
                    });
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
            console.log("ERRRORR", error.response?.data?.errors)
            handleErrorApi(error.response?.data?.errors as any);
        }
        return Promise.reject(error);
    }
);

export const httpClient = {
    get: <T>(url: string, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosInstance.get<any, Result<T>>(url, config),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosInstance.post<any, Result<T>>(url, data, config),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosInstance.put<any, Result<T>>(url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosInstance.delete<any, Result<T>>(url, config),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosInstance.patch<any, Result<T>>(url, data, config),
};

export const httpClientRetry = {
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Result<T>> =>
        axiosRetry.post<any, Result<T>>(url, data, config),
};

