import { httpClient } from "@/common/api/instance.axios";
import type { LoginResponse } from "@/common/types/auth";
import type { PaginatedResponseModel } from "@/common/types/common";

import type { CourseCategory, Expertise, RegisterRequest } from "../types";

export const registerService = {
    register: (body: RegisterRequest) =>
        httpClient.post<LoginResponse>("auth/register", body),
    registerWithFormData: (formData: FormData) =>
        httpClient.post<LoginResponse>("auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    getAllCourseCategories: () =>
        httpClient.get<PaginatedResponseModel<CourseCategory>>(
            "course-categories?pageSize=100",
        ),
    getAllExpertises: () => httpClient.get<Expertise[]>("expertises"),
};
