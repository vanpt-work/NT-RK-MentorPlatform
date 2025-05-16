export type User = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Mentor" | "Learner";
    status: "Active" | "Pending" | "Deactivated";
    joinDate: Date;
    lastActive: Date;
};
