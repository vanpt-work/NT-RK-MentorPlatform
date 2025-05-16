import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Resolver } from "react-hook-form";

import LoadingSpinner from "@/common/components/loading-spinner";
import { Button } from "@/common/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";
import { Progress } from "@/common/components/ui/progress";
import authService from "@/common/services/authServices";
import { CommunicationPreference, LearningStyle, Role, SessionFrequency, TeachingStyle, UserAvailability, type RegisterRequest } from "@/common/types/auth";

// Import our new components
import { AccountStep } from "./account-step";
import { PreferencesStep } from "./preferences-step";
import { PrivacyDialog } from "./privacy-dialog";
import { ProfileStep } from "./profile-step";
import { TermsDialog } from "./terms-dialog";
import type {
    AccountFormValues,
    PreferencesFormValues,
    ProfileFormValues,
} from "../types";
import {
    accountSchema,
    preferencesSchema,
    profileSchema,
} from "../utils/schemas";
import { useNavigate } from "react-router-dom";

// Giả lập ánh xạ giữa tên chủ đề và ID dùng trong quá trình phát triển
// Trong môi trường sản phẩm, đây sẽ được lấy từ API
const MOCK_TOPIC_ID_MAP: Record<string, string> = {
    "Content Writing": "5f9d4a3e-82c1-4318-9a4c-a5d5e5c9c9e1",
    "Design": "6a7b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
    "Product": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    "Product Research": "7c8d9e0f-1g2h-3i4j-5k6l-7m8n9o0p1q2r",
    "Technical Skills": "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
    "Leadership": "9e0f1g2h-3i4j-5k6l-7m8n-9o0p1q2r3s4t5u",
    "Communication": "5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u1v",
    "Career Development": "1g2h3i4j-5k6l-7m8n-9o0p-1q2r3s4t5u6v7w",
    "Work-Life Balance": "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w3x",
    "Industry Insights": "3i4j5k6l-7m8n-9o0p-1q2r-3s4t5u6v7w8x9y",
    "Networking": "9j0k1l2m-3n4o-5p6q-7r8s-9t0u1v2w3x4y5z",
    "Entrepreneurship": "5k6l7m8n-9o0p-1q2r-3s4t-5u6v7w8x9y0z1a",
};

// Giả lập ánh xạ giữa tên chuyên môn và ID
const MOCK_EXPERTISE_ID_MAP: Record<string, string> = {
    "Leadership": "1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q",
    "Programming": "7c8d9e0f-1g2h-3i4j-5k6l-7m8n9o0p1q2r",
    "Design": "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
    "Marketing": "9e0f1g2h-3i4j-5k6l-7m8n-9o0p1q2r3s4t",
    "Data Science": "5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u",
    "Business": "1g2h3i4j-5k6l-7m8n-9o0p-1q2r3s4t5u6v",
    "Project Management": "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w",
    "Communication": "3i4j5k6l-7m8n-9o0p-1q2r-3s4t5u6v7w8x",
};

// Mapping function to convert form values to RegisterRequest
const mapFormDataToRegisterRequest = (
    accountData: AccountFormValues,
    profileData: ProfileFormValues,
    preferencesData: PreferencesFormValues
): RegisterRequest => {
    // Map role from string to Role enum
    const roleMap: Record<string, Role> = {
        "Learner": Role.Learner,
        "Mentor": Role.Mentor
    };
    
    // Map communication method to CommunicationPreference enum
    const communicationMap: Record<string, CommunicationPreference> = {
        "Video call": CommunicationPreference.Video,
        "Audio call": CommunicationPreference.Audio, // Fallback to video since there's no exact match
        "Text chat": CommunicationPreference.Text,
    };
    
    // Map session frequency to SessionFrequency enum
    const frequencyMap: Record<string, SessionFrequency> = {
        "Weekly": SessionFrequency.Week,
        "Every two weeks": SessionFrequency.TwoWeek,
        "Monthly": SessionFrequency.Month,
        "As Needed": SessionFrequency.AsNeeded 
    };
    
    // Map learning style to LearningStyle enum
    const learningStyleMap: Record<string, LearningStyle> = {
        "Visual": LearningStyle.Visual,
        "Auditory": LearningStyle.Auditory,
        "Reading/Writing": LearningStyle.ReadWriting,
        "Kinesthetic": LearningStyle.Kinesthetic
    };
    
    // Map availability to UserAvailability enum array
    const mapAvailability = (availabilities: string[] | undefined): UserAvailability[] | undefined => {
        if (!availabilities || availabilities.length === 0) {
            return undefined;
        }
        
        const availabilityMap: Record<string, UserAvailability> = {
            "Weekdays": UserAvailability.Weekdays,
            "Weekends": UserAvailability.Weekends,
            "Evenings": UserAvailability.Evenings,
            "Mornings": UserAvailability.Mornings,
            "Afternoons": UserAvailability.Weekdays // Fallback to weekdays since there's no exact match
        };
        
        return availabilities.map(a => availabilityMap[a] || UserAvailability.Weekdays);
    };
    
    // Map teaching approach to TeachingStyle enum array
    const mapTeachingStyles = (approach?: string): TeachingStyle[] | undefined => {
        if (!approach) return undefined;
        
        const styleMap: Record<string, TeachingStyle> = {
            "handson": TeachingStyle.HandsOnPractice,
            "discussion": TeachingStyle.DiscussionBased,
            "project": TeachingStyle.ProjectBased,
            "lecture": TeachingStyle.LectureStyle
        };
        
        return [styleMap[approach] || TeachingStyle.LectureStyle];
    };
    
    // Calculate duration in minutes from session duration string
    const mapDuration = (duration: string): number => {
        const durationMap: Record<string, number> = {
            "30 minutes": 30,
            "45 minutes": 45,
            "1 hour": 60,
            "1.5 hours": 90,
            "2 hours": 120
        };
        
        return durationMap[duration] || 60;
    };
    
    // Ánh xạ các tên chủ đề thành ID guid
    const mapTopicNamesToIds = (topicNames: string[] | undefined): string[] | undefined => {
        if (!topicNames || topicNames.length === 0) {
            return undefined;
        }
        
        return topicNames
            .map(name => MOCK_TOPIC_ID_MAP[name])
            .filter(id => id !== undefined); // Loại bỏ các giá trị undefined
    };
    
    // Ánh xạ các tên chuyên môn thành ID guid
    const mapExpertiseNamesToIds = (expertiseNames: string[] | undefined): string[] | undefined => {
        if (!expertiseNames || expertiseNames.length === 0) {
            return undefined;
        }
        
        return expertiseNames
            .map(name => MOCK_EXPERTISE_ID_MAP[name])
            .filter(id => id !== undefined); // Loại bỏ các giá trị undefined
    };
    
    return {
        email: accountData.email,
        password: accountData.password,
        avatarUrl: profileData.photo,
        fullName: profileData.fullName,
        role: roleMap[profileData.role] || Role.Learner,
        bio: profileData.bio,
        isNotification: preferencesData.privacySettings?.isNotification,
        isReceiveMessage: preferencesData.privacySettings?.isReceiveMessage,
        isPrivateProfile: preferencesData.privacySettings?.isPrivateProfile,
        expertises: mapExpertiseNamesToIds(profileData.expertises),
        professionalSkill: profileData.professionalSkill,
        experience: profileData.experience,
        communicationPreference: communicationMap[profileData.communicationPreference],
        goals: profileData.goals,
        availability: mapAvailability(profileData.availability),
        courseCategoryIds: mapTopicNamesToIds(preferencesData.courseCategoryIds),
        sessionFrequency: frequencyMap[preferencesData.sessionFrequency],
        duration: mapDuration(preferencesData.duration),
        learningStyle: learningStyleMap[preferencesData.learningStyle],
        teachingStyles: mapTeachingStyles(preferencesData.teachingStyles)
    };
};

export function RegisterForm() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [showTermsDialog, setShowTermsDialog] = useState(false);
    const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
    const navigate = useNavigate();

    // Form state for each step
    const accountForm = useForm<AccountFormValues>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            termsAgreed: false,
        },
        mode: "onChange",
    });

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            role: "Learner",
            fullName: "",
            bio: "",
            photo: undefined,
            expertises: [],
            professionalSkill: "",
            experience: "",
            availability: [],
            communicationPreference: "Video call",
            goals: "",
        },
        mode: "onChange",
    });

    const preferencesForm = useForm<PreferencesFormValues>({
        resolver: zodResolver(preferencesSchema) as Resolver<PreferencesFormValues>,
        defaultValues: {
            courseCategoryIds: [],
            sessionFrequency: "Weekly",
            duration: "1 hour",
            learningStyle: "Visual",
            privacySettings: {
                isPrivateProfile: false,
                isReceiveMessage: true,
                isNotification: true,
            },
        },
        mode: "onChange",
    });

    // Handle file upload for avatar
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setAvatarPreview(result);
                profileForm.setValue("photo", file);
            };
            reader.readAsDataURL(file);
        }
    };

    // Final submission after step 3 (preferences)
    const onFinalSubmit = async () => {
        setIsLoading(true);
        try {
            // Validate all forms first
            const accountValid = await accountForm.trigger();
            const profileValid = await profileForm.trigger();
            const preferencesValid = await preferencesForm.trigger();
            
            if (!accountValid || !profileValid || !preferencesValid) {
                toast.error("Please fix the validation errors before submitting.");
                setIsLoading(false);
                return;
            }
            
            // Combine all form data and map to RegisterRequest
            const registerData = mapFormDataToRegisterRequest(
                accountForm.getValues(),
                profileForm.getValues(),
                preferencesForm.getValues()
            );
            
            // Log the request data for debugging
            console.log("Register request data:", JSON.stringify(registerData, null, 2));
            
            // Gọi API đăng ký với FormData
            await authService.register(registerData);
            
            // Show success toast
            toast.success(
                "Account created successfully! Redirecting to email verification...",
            );
            
            // Redirect to email verification page after a short delay
            setTimeout(() => {
                const email = accountForm.getValues().email;
                navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=registration`);
            }, 2000);
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Step navigation
    const nextStep = () => {
        if (step === 1) {
            accountForm.handleSubmit(() => setStep(2))();
        } else if (step === 2) {
            profileForm.handleSubmit(() => setStep(3))();
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Get step title and description
    const getStepTitle = () => {
        switch (step) {
            case 1:
                return "Create an account";
            case 2:
                return "Create your profile";
            case 3:
                return "Set your preferences";
            default:
                return "Create an account";
        }
    };
    
    const getStepDescription = () => {
        switch (step) {
            case 1:
                return "Complete the steps below to create your account";
            case 2:
                return "Tell us more about yourself";
            case 3:
                return "Customize your experience";
            default:
                return "Complete the steps below to create your account";
        }
    };

    return (
        <Card className="mx-auto w-full max-w-4xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">
                    {getStepTitle()}
                </CardTitle>
                <CardDescription className="text-center">
                    {getStepDescription()}
                </CardDescription>
                <div className="my-4">
                    <Progress value={step * 33.33} className="h-2" />
                    <div className="text-muted-foreground mt-2 flex justify-between text-sm">
                        <div className="flex-1 text-center">
                            <span
                                className={
                                    step >= 1 ? "text-primary font-medium" : ""
                                }
                            >
                                Step 1: Account
                            </span>
                        </div>
                        <div className="flex-1 text-center">
                            <span
                                className={
                                    step >= 2 ? "text-primary font-medium" : ""
                                }
                            >
                                Step 2: Profile
                            </span>
                        </div>
                        <div className="flex-1 text-center">
                            <span
                                className={
                                    step >= 3 ? "text-primary font-medium" : ""
                                }
                            >
                                Step 3: Preferences
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {step === 1 && (
                    <AccountStep
                        form={accountForm}
                        onOpenTermsDialog={() => setShowTermsDialog(true)}
                        onOpenPrivacyDialog={() => setShowPrivacyDialog(true)}
                    />
                )}

                {step === 2 && (
                    <ProfileStep
                        form={profileForm}
                        avatarPreview={avatarPreview}
                        onAvatarChange={handleAvatarChange}
                        hideRoleSelection={false}
                    />
                )}

                {step === 3 && (
                    <PreferencesStep
                        form={preferencesForm}
                        role={profileForm.getValues("role")}
                        onSubmit={onFinalSubmit}
                    />
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => (window.location.href = "/login")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Button>
                )}

                {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={preferencesForm.handleSubmit(onFinalSubmit)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingSpinner size="sm" />
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            <>
                                Create Account
                                <Check className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                )}
            </CardFooter>

            {/* Terms of Service and Privacy Policy Dialogs */}
            <TermsDialog
                open={showTermsDialog}
                onOpenChange={setShowTermsDialog}
            />
            <PrivacyDialog
                open={showPrivacyDialog}
                onOpenChange={setShowPrivacyDialog}
            />
        </Card>
    );
}
