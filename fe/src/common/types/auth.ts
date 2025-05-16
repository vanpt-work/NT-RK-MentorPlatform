export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type VerifyEmailRequest = {
    email: string;
    code: string;
};

export type RefreshTokenRequest = Token;

export type VerifyEmailResponse = Token;

export type RefreshTokenResponse = Token;

export type LoginResponse = Token & {
    isVerifyEmail: boolean;
};

export enum Role {
    Admin = 0,
    Mentor = 1,
    Learner = 2,
    All = 3,
}

export enum CommunicationPreference {
    Video = 0,
    Audio = 1,
    Text = 2,
}

export enum UserAvailability {
    Weekdays = 0,
    Weekends = 1,
    Mornings = 2,
    Afternoons = 3,
    Evenings = 4,
}

export enum SessionFrequency {
    Week = 0,
    TwoWeek = 1,
    Month = 2,
    AsNeeded = 3,
}

export enum LearningStyle {
    Visual = 0,
    Auditory = 1,
    ReadWriting = 2,
    Kinesthetic = 3,
}

export enum TeachingStyle {
    HandsOnPractice = 0,
    DiscussionBased = 1,
    ProjectBased = 2,
    LectureStyle = 3,
}

export type RegisterRequest = {
    email: string;
    password: string;
    avatarUrl?: File | null;
    fullName: string;
    role: Role;
    bio?: string | null;
    isNotification?: boolean;
    isReceiveMessage?: boolean;
    isPrivateProfile?: boolean;
    expertises?: string[] | null;
    professionalSkill?: string | null;
    experience?: string | null;
    communicationPreference?: CommunicationPreference | null;
    goals?: string | null;
    availability?: UserAvailability[] | null;
    courseCategoryIds?: string[] | null;
    sessionFrequency: SessionFrequency;
    duration: number;
    learningStyle?: LearningStyle | null;
    teachingStyles?: TeachingStyle[] | null;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type VerifyForgotPasswordRequest = {
    email: string;
    code: string;
};

export type ResendVerifyEmailRequest = {
    email: string;
};

// export type EditingUserProfileRequest = {
//     fullName: string;
//     avatarUrl?: File;
//     bio?: string;
//     isNotification?: boolean;
//     isReceiveMessage?: boolean;
//     isPrivateProfile?: boolean;
//     expertises?: string[];
//     professionalSkill?: string;
//     experience?: string;
//     communicationPreference?: CommunicationPreference;
//     goals?: string;
//     availability?: UserAvailability[];
//     courseCategoryIds?: string[];
//     sessionFrequency: SessionFrequency;
//     duration: number;
//     learningStyle?: LearningStyle;
//     teachingStyles?: TeachingStyle[];
// };

export type CurrentUser = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl : string;
    role: Role;
};
