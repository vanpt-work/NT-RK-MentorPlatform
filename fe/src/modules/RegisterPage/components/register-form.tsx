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
import { CommunicationPreference, LearningStyle, Role, SessionFrequency, TeachingStyle, UserAvailability, type RegisterRequest } from "../types";

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
import { registerService } from "../services/registerServices";

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
        "Audio call": CommunicationPreference.Audio,
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
            "Afternoons": UserAvailability.Weekdays
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
        expertises: profileData.expertises,
        professionalSkill: profileData.professionalSkill,
        experience: profileData.experience,
        communicationPreference: communicationMap[profileData.communicationPreference],
        goals: profileData.goals,
        availability: mapAvailability(profileData.availability),
        courseCategoryIds: preferencesData.courseCategoryIds,
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
            
            const formData = new FormData();
            
            formData.append('email', registerData.email);
            formData.append('password', registerData.password);
            formData.append('fullName', registerData.fullName);
            formData.append('role', String(registerData.role));
            if (registerData.bio) formData.append('bio', registerData.bio);
            if (registerData.isNotification !== undefined) formData.append('isNotification', String(registerData.isNotification));
            if (registerData.isReceiveMessage !== undefined) formData.append('isReceiveMessage', String(registerData.isReceiveMessage));
            if (registerData.isPrivateProfile !== undefined) formData.append('isPrivateProfile', String(registerData.isPrivateProfile));
            if (registerData.professionalSkill) formData.append('professionalSkill', registerData.professionalSkill);
            if (registerData.experience) formData.append('experience', registerData.experience);
            if (registerData.communicationPreference !== undefined) formData.append('communicationPreference', String(registerData.communicationPreference));
            if (registerData.goals) formData.append('goals', registerData.goals);
            formData.append('sessionFrequency', String(registerData.sessionFrequency));
            formData.append('duration', String(registerData.duration));
            if (registerData.learningStyle !== undefined) formData.append('learningStyle', String(registerData.learningStyle));
            if (registerData.avatarUrl && registerData.avatarUrl instanceof File) {
                formData.append('avatarUrl', registerData.avatarUrl);
            }
            if (registerData.expertises && registerData.expertises.length > 0) {
                registerData.expertises.forEach((expertise) => {
                    formData.append('expertises', expertise);
                });
            }
            if (registerData.courseCategoryIds && registerData.courseCategoryIds.length > 0) {
                registerData.courseCategoryIds.forEach((categoryId) => {
                    formData.append('courseCategoryIds', categoryId);
                });
            }
            if (registerData.availability && registerData.availability.length > 0) {
                registerData.availability.forEach((avail) => {
                    formData.append('availability', String(avail));
                });
            }
            if (registerData.teachingStyles && registerData.teachingStyles.length > 0) {
                registerData.teachingStyles.forEach((style) => {
                    formData.append('teachingStyles', String(style));
                });
            }
            
            await registerService.registerWithFormData(formData);
            
            toast.success(
                "Account created successfully! Redirecting to email verification...",
            );
            
            setTimeout(() => {
                const email = accountForm.getValues().email;
                navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=registration`);
            }, 1500);
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
