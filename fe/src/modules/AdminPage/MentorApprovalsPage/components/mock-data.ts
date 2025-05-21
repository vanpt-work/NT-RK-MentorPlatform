import { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

import type { MentorApplication } from "../types";

// Mock data
export const mockApplications: MentorApplication[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "",
        appliedDate: "2023-05-15",
        status: ApplicationStatus.PENDING,
        expertise: ["Web Development", "React", "Node.js"],
        education:
            "Bachelor's degree in Computer Science from XYZ University. Graduated with honors.",
        workExperience:
            "Experienced web developer with 5 years of experience in React and Node.js.",
        certifications: ["Web Development", "React", "Node.js"],
        description:
            "I'm passionate about teaching and sharing my knowledge with others. I have experience mentoring junior developers and find it rewarding to help others grow.",
        documents: [
            {
                id: "doc1",
                name: "CV.pdf",
                type: "pdf",
                url: "https://example.com/cv.pdf",
                file: new File([""], "CV.pdf", { type: "application/pdf" }),
            },
            {
                id: "doc2",
                name: "Certificate.pdf",
                type: "pdf",
                url: "https://example.com/certificate.pdf",
                file: new File([""], "Certificate.pdf", {
                    type: "application/pdf",
                }),
            },
        ],
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        avatarUrl: "",
        appliedDate: "2023-05-20",
        status: ApplicationStatus.UNDER_REVIEW,
        expertise: ["UI/UX Design", "Figma", "Adobe XD"],
        education: "Master's degree in UI/UX Design from ABC University.",
        workExperience:
            "UI/UX designer with a passion for creating beautiful and user-friendly interfaces.",
        certifications: ["UI/UX Design", "Figma", "Adobe XD"],
        description:
            "I want to help aspiring designers understand the principles of good design and how to apply them in real-world projects.",
        documents: [
            {
                id: "doc3",
                name: "Portfolio.pdf",
                type: "pdf",
                url: "https://example.com/portfolio.pdf",
                file: new File([""], "Portfolio.pdf", {
                    type: "application/pdf",
                }),
            },
        ],
        notes: "Please provide more details about your teaching experience and methodology.",
    },
    {
        id: "3",
        name: "David Johnson",
        email: "david.johnson@example.com",
        avatarUrl: "",
        appliedDate: "2023-05-25",
        status: ApplicationStatus.APPROVED,
        expertise: ["Data Science", "Python", "Machine Learning"],
        education: "PhD in Computer Science with focus on Machine Learning",
        workExperience:
            "Data scientist with 7 years of experience in Python and machine learning.",
        certifications: ["Data Science", "Python", "Machine Learning"],
        description:
            "I believe in the power of data and want to help others harness it effectively. My teaching approach focuses on practical applications.",
        documents: [
            {
                id: "doc4",
                name: "Resume.pdf",
                type: "pdf",
                url: "https://example.com/resume.pdf",
                file: new File([""], "Resume.pdf", { type: "application/pdf" }),
            },
        ],
    },
    {
        id: "4",
        name: "Sarah Williams",
        email: "sarah.williams@example.com",
        avatarUrl: "",
        appliedDate: "2023-06-01",
        status: ApplicationStatus.REJECTED,
        expertise: ["Mobile Development", "React Native", "Flutter"],
        education: "Bachelor's in Mobile App Development",
        workExperience:
            "Mobile developer experienced in React Native and Flutter.",
        certifications: ["Mobile Development", "React Native", "Flutter"],
        description:
            "I want to guide new developers through the complexities of mobile app development and help them build their first apps.",
        documents: [
            {
                id: "doc5",
                name: "CV.pdf",
                type: "pdf",
                url: "https://example.com/cv2.pdf",
                file: new File([""], "CV.pdf", { type: "application/pdf" }),
            },
        ],
        notes: "Application rejected due to insufficient teaching experience.",
    },
];
