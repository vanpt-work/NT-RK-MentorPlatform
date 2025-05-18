import type { User } from "../../modules/AdminPage/ManageUsersPage/types";
import { httpClient } from "../api/instance.axios";
import type { PaginationResult } from "../types/result";

export const userServices = {
    get: (pageNumber: number = 1, pageSize: number = 10) =>
        httpClient.get<PaginationResult<User>>("users", {
            params: { pageNumber, pageSize },
        }),
    activate: (userId: string) => httpClient.patch(`users/${userId}/activate`),
    deactivate: (userId: string) =>
        httpClient.patch(`users/${userId}/deactivate`),
};
