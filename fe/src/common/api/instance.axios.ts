/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from "axios";
import { ROOT_API } from "./api.constant";
import type { Result } from "../types/result";



export const axiosInstance = axios.create(ROOT_API);
export const axiosRetry = axios.create(ROOT_API);

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
