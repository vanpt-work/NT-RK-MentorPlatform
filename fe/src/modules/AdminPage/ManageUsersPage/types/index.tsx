export type User = {
    id: string;
    name: string;
    email: string;
    role: number;
    isActive: boolean;
    createdAt: string;
    lastActive: string;
    userDetail: {
        fullName: string;
    };
};
