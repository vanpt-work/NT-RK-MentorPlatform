import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { AccountFormValues, PreferencesFormValues, ProfileFormValues } from "../RegisterPage/types";
import { accountSchema, preferencesSchema, profileSchema } from "../RegisterPage/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingSpinner from "@/common/components/loading-spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { ProfileStep } from "../RegisterPage/components/profile-step";
import { Button } from "@/common/components/ui/button";
import { PreferencesStep } from "../RegisterPage/components";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"Learner" | "Mentor">("Learner");

  // Form state for each section
  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsAgreed: true,
    },
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
      communicationMethod: "Video call",
      availability: [],
      goals: "",
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema) as any,
    defaultValues: {
      topics: [],
      sessionFrequency: "Weekly",
      sessionDuration: "1 hour",
      learningStyle: "Visual",
      teachingApproach: undefined,
      privacySettings: {
        privateProfile: false,
        allowMessages: true,
        receiveNotifications: true,
      },
    },
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
        saveChanges("profile");
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsFetching(true);
      try {
        // TODO: Implement API call to fetch user data
        // Mocking user data for now
        const userData = {
          email: "user@example.com",
          fullName: "John Doe",
          bio: "I am a software developer with 5 years of experience. I love helping others learn coding and software development best practices.",
          photo: "https://github.com/shadcn.png",
          role: "Mentor" as "Learner" | "Mentor",
          expertise: ["Programming", "Leadership"],
          professionalSkills: "JavaScript, React, Node.js",
          industryExperience: "5 years in tech, 2 years in finance",
          communicationMethod: "Video call" as "Video call",
          availability: ["Weekdays Morning", "Weekdays Evening"],
          goals: "I want to help others grow in their software development career",
          topics: ["Programming", "Design"],
          sessionFrequency: "Weekly" as "Weekly",
          sessionDuration: "1 hour" as "1 hour",
          learningStyle: "Visual",
          teachingApproach: "handson" as "handson" | "discussion" | "project" | "lecture",
          privacySettings: {
            privateProfile: false,
            allowMessages: true,
            receiveNotifications: true,
          },
        };

        // Set role
        setUserRole(userData.role);

        // Set avatar preview
        setAvatarPreview(userData.photo);

        // Set form values
        accountForm.reset({
          email: userData.email,
          password: "",
          confirmPassword: "",
          termsAgreed: true,
        });

        profileForm.reset({
          role: userData.role,
          fullName: userData.fullName,
          bio: userData.bio,
          photo: userData.photo,
          expertise: userData.expertise,
          professionalSkills: userData.professionalSkills,
          industryExperience: userData.industryExperience,
          communicationMethod: userData.communicationMethod,
          availability: userData.availability,
          goals: userData.goals,
        });

        preferencesForm.reset({
          topics: userData.topics,
          sessionFrequency: userData.sessionFrequency,
          sessionDuration: userData.sessionDuration,
          learningStyle: userData.learningStyle,
          teachingApproach: userData.teachingApproach,
          privacySettings: userData.privacySettings,
        });

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load profile data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [accountForm, profileForm, preferencesForm]);

  // Save changes
  const saveChanges = async (section: string) => {
    setIsLoading(true);
    try {
      // Get form data based on section
      let formData = {};
      
      switch (section) {
        case "account":
          // Skip validation for password if it's empty (user not changing password)
          if (!accountForm.getValues("password")) {
            toast.success("Account information updated");
            setIsLoading(false);
            return;
          }
          await accountForm.trigger();
          if (!accountForm.formState.isValid) {
            setIsLoading(false);
            return;
          }
          formData = accountForm.getValues();
          break;
        case "profile":
          await profileForm.trigger();
          if (!profileForm.formState.isValid) {
            setIsLoading(false);
            return;
          }
          formData = profileForm.getValues();
          break;
        case "preferences":
          await preferencesForm.trigger();
          if (!preferencesForm.formState.isValid) {
            setIsLoading(false);
            return;
          }
          formData = preferencesForm.getValues();
          break;
      }

      // TODO: Implement API call to save changes
      console.log(`Saving ${section} data:`, formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success toast
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} information updated`);
    } catch (error) {
      console.error(`Failed to save ${section} changes:`, error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner size="lg" text="Loading profile..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal" className="py-4">
              <div className="space-y-4">
                <ProfileStep
                  form={profileForm as any}
                  avatarPreview={avatarPreview}
                  onAvatarChange={handleAvatarChange}
                  hideRoleSelection={true}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={() => saveChanges("profile")} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences" className="py-4">
              <div className="space-y-4">
                <PreferencesStep 
                  form={preferencesForm as any}
                  role={userRole}
                  onSubmit={() => {}}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={() => saveChanges("preferences")} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Account Tab */}
            <TabsContent value="account" className="py-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-4 text-muted-foreground">
                    Change your password.
                    <br />
                    Leave password fields empty if you don't want to change your password.
                  </p>
                  <div className="rounded-lg border p-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={accountForm.getValues("email")}
                            disabled={true}
                            readOnly
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Email address cannot be changed. Please contact support if you need to update your email.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            New Password
                          </label>
                          <input
                            id="password"
                            type="password"
                            placeholder="Leave blank to keep current password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...accountForm.register("password")}
                            disabled={isLoading}
                          />
                          {accountForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                              {accountForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...accountForm.register("confirmPassword")}
                            disabled={isLoading}
                          />
                          {accountForm.formState.errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                              {accountForm.formState.errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={() => saveChanges("account")} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}