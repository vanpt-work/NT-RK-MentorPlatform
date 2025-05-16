import type { Expertise } from "@/modules/RegisterPage/types";
import type { PaginatedResponseModel } from "../types/common";

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

// Tạo response mock
const mockPaginatedResponse: PaginatedResponseModel<Expertise> = {
    items: mockExpertises,
    totalItems: mockExpertises.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: mockExpertises.length
};

const expertiseService = {
    getAllExpertises: () => {
        return Promise.resolve({
            data: mockPaginatedResponse
        });
    }
    
    // getAllExpertises: () => httpClient.get<PaginatedResponseModel<Expertise>>('expertises'),
};

export default expertiseService; 
