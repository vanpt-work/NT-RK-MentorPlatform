import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

// Import our new components
import { AccountStep } from "./registration/account-step";
import { ProfileStep } from "./registration/profile-step";
import { PreferencesStep } from "./registration/preferences-step";
import { TermsDialog } from "./registration/terms-dialog";
import { PrivacyDialog } from "./registration/privacy-dialog";

// Schemas
import { accountSchema, profileSchema, preferencesSchema } from "../../utils/schemas";

// Types 
import type { AccountFormValues, ProfileFormValues, PreferencesFormValues } from "../../types/Account";

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
      terms: false,
    },
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: "learner",
      fullName: "",
      bio: "",
      avatarUrl: "",
      expertise: [],
      professionalSkills: [],
      experience: "",
      communication: "video",
      availability: [],
      goals: "",
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema) as any,
    defaultValues: {
      interests: [],
      sessionFrequency: "weekly",
      sessionDuration: "60min",
      learningStyle: "visual",
      teachingApproach: undefined,
      privacy: {
        privateProfile: false,
        allowMessages: true,
        notifications: true,
      },
    },
  });

  // Handle checkbox selection for terms
  const handleTermsChange = (checked: boolean) => {
    accountForm.setValue("terms", checked, { 
      shouldValidate: true
    });
  };

  // Handle file upload for avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatarPreview(result);
        profileForm.setValue("avatarUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Final submission
  const onFinalSubmit = async () => {
    setIsLoading(true);
    try {
      // Combine all form data
      const formData = {
        ...accountForm.getValues(),
        ...profileForm.getValues(),
        ...preferencesForm.getValues(),
      };
      
      // TODO: Send data to API
      console.log("Registration data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast.success("Account created successfully! Redirecting to login...");
      
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle expertise selection
  const handleExpertiseChange = (expertise: string) => {
    const currentExpertise = profileForm.getValues("expertise") || [];
    const updatedExpertise = currentExpertise.includes(expertise)
      ? currentExpertise.filter(e => e !== expertise)
      : [...currentExpertise, expertise];
    
    profileForm.setValue("expertise", updatedExpertise, { 
      shouldValidate: true 
    });
  };
  
  // Handle professional skills selection
  const handleSkillChange = (skill: string) => {
    const currentSkills = profileForm.getValues("professionalSkills") || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    profileForm.setValue("professionalSkills", updatedSkills, { 
      shouldValidate: true 
    });
  };
  
  // Handle availability selection
  const handleAvailabilityChange = (slot: string) => {
    const currentAvailability = profileForm.getValues("availability") || [];
    const updatedAvailability = currentAvailability.includes(slot)
      ? currentAvailability.filter(a => a !== slot)
      : [...currentAvailability, slot];
    
    profileForm.setValue("availability", updatedAvailability, { 
      shouldValidate: true 
    });
  };
  
  // Handle interests selection
  const handleInterestChange = (interest: string) => {
    const currentInterests = preferencesForm.getValues("interests") || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    preferencesForm.setValue("interests", updatedInterests, { 
      shouldValidate: true 
    });
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Complete the steps below to create your account
        </CardDescription>
        <div className="my-4">
          <Progress value={step * 33.33} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <div className="flex-1 text-center">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>Step 1: Account</span>
            </div>
            <div className="flex-1 text-center">
              <span className={step >= 2 ? "text-primary font-medium" : ""}>Step 2: Profile</span>
            </div>
            <div className="flex-1 text-center">
              <span className={step >= 3 ? "text-primary font-medium" : ""}>Step 3: Preferences</span>
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
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.location.href = "/login"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Button>
        )}
        
        {step < 3 ? (
          <Button 
            type="button" 
            onClick={nextStep}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={preferencesForm.handleSubmit(onFinalSubmit)}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"} 
            {!isLoading && <Check className="ml-2 h-4 w-4" />}
          </Button>
        )}
      </CardFooter>

      {/* Terms of Service and Privacy Policy Dialogs */}
      <TermsDialog open={showTermsDialog} onOpenChange={setShowTermsDialog} />
      <PrivacyDialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog} />
    </Card>
  );
}
