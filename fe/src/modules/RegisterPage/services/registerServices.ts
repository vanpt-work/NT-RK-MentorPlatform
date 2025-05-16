import { httpClient } from "@/common/api/instance.axios";
import type { CourseCategory, Expertise, RegisterRequest } from "../types";
import type { LoginResponse } from "@/common/types/auth";
import type { PaginatedResponseModel } from "@/common/types/common";

export const registerService = {
    register: (body: RegisterRequest) => httpClient.post<LoginResponse>('auth/register', body),
    registerWithFormData: (formData: FormData) => httpClient.post<LoginResponse>('auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getAllCourseCategories: () => httpClient.get<PaginatedResponseModel<CourseCategory>>('course-categories?pageSize=100'),
    getAllExpertises: () => {
        return Promise.resolve({
            data: mockPaginatedResponse
        });
    },
};


const mockExpertises: Expertise[] = [
    {
        id: "1",
        name: "Software Development",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "2",
        name: "Data Science",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "3",
        name: "Business & Management",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "4",
        name: "Design & Creativity",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "5",
        name: "Marketing",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "6",
        name: "Engineering",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "7",
        name: "Education",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "8",
        name: "Finance",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "9",
        name: "Information Technology",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "10",
        name: "Project Management",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "11",
        name: "Artificial Intelligence",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "12",
        name: "Mobile Development",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

const mockPaginatedResponse: PaginatedResponseModel<Expertise> = {
    items: mockExpertises,
    totalItems: mockExpertises.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: mockExpertises.length
};
