import type { z } from "zod";
import type { accountSchema, profileSchema, preferencesSchema } from "../utils/schemas";
import type { UseFormReturn } from "react-hook-form";

// Define types from schemas
export type AccountFormValues = z.infer<typeof accountSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PreferencesFormValues = z.infer<typeof preferencesSchema>;

export type AccountStepProps = {
    form: UseFormReturn<AccountFormValues>;
    onOpenTermsDialog: () => void;
    onOpenPrivacyDialog: () => void;
};

export type ProfileStepProps = {
    form: UseFormReturn<ProfileFormValues>;
    avatarPreview: string | null;
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hideRoleSelection?: boolean;
};

export type SessionFrequencyType = "Weekly" | "Every two weeks" | "Monthly" | "As Needed";
export type SessionDurationType = "30 minutes" | "45 minutes" | "1 hour" | "1.5 hours" | "2 hours";

export type PreferencesStepProps = {
    form: UseFormReturn<PreferencesFormValues>;
    role: "Learner" | "Mentor";
    onSubmit: () => void;
};


// Sample data for selects
export const expertiseAreas = [
  "Leadership",
  "Programming",
  "Design",
  "Marketing",
  "Data Science",
  "Business",
  "Project Management",
  "Communication",
];

// Topics of Interest for preferences
export const interestTopics = [
  "Content Writing",
  "Design",
  "Product",
  "Product Research",
  "Technical Skills",
  "Leadership",
  "Communication",
  "Career Development",
  "Work-Life Balance", 
  "Industry Insights",
  "Networking",
  "Entrepreneurship",
];

export const availabilitySlots = [
  "Weekdays",
  "Weekends",
  "Mornings",
  "Afternoons",
  "Evenings",
];

