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

export function RegisterForm() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [showTermsDialog, setShowTermsDialog] = useState(false);
    const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

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
            expertise: [],
            professionalSkills: "",
            industryExperience: "",
            availability: [],
            communicationMethod: "Video call",
            goals: "",
        },
        mode: "onChange",
    });

    const preferencesForm = useForm<PreferencesFormValues>({
        resolver: zodResolver(preferencesSchema) as Resolver<PreferencesFormValues>,
        defaultValues: {
            topics: [],
            sessionFrequency: "Weekly",
            sessionDuration: "1 hour",
            learningStyle: "Visual",
            privacySettings: {
                privateProfile: false,
                allowMessages: true,
                receiveNotifications: true,
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
            // Combine all form data
            const formData = {
                ...accountForm.getValues(),
                ...profileForm.getValues(),
                ...preferencesForm.getValues(),
            };
            
            // TODO: Replace with actual API call to register user
            console.log("Registering user with:", formData);
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // Show success toast
            toast.success(
                "Account created successfully! Redirecting to email verification...",
            );
            
            // Redirect to email verification page after a short delay
            setTimeout(() => {
                // Get email from form
                const email = accountForm.getValues().email;
                // Redirect to verify-otp page with the email as parameter
                window.location.href = `/verify-otp?email=${encodeURIComponent(email)}&purpose=registration`;
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
