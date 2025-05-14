import * as z from "zod";

// Step 1: Account Information
export const accountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      "Password must include uppercase, lowercase, number and special character"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 2: Role & Profile Information
export const profileSchema = z.object({
  role: z.enum(["learner", "mentor"], {
    required_error: "You need to select a role",
  }),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  bio: z.string().min(30, "Bio must be at least 30 characters").max(300, "Bio must not exceed 300 characters"),
  avatarUrl: z.string().optional(),
  expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
  professionalSkills: z.array(z.string()).min(1, "Select at least one professional skill"),
  experience: z.string().min(1, "Please provide your experience"),
  communication: z.enum(["video", "audio", "text"], {
    required_error: "You need to select a preferred communication method",
  }),
  availability: z.array(z.string()).min(1, "Select at least one availability slot"),
  goals: z.string().min(20, "Please provide more detailed goals"),
});

// Step 3: Preferences
export const preferencesSchema = z.object({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  sessionFrequency: z.enum(["weekly", "biweekly", "monthly"], {
    required_error: "You need to select a session frequency",
  }),
  sessionDuration: z.enum(["30min", "60min", "90min"], {
    required_error: "You need to select a session duration",
  }),
  learningStyle: z.enum(["visual", "auditory", "reading", "kinesthetic"], {
    required_error: "You need to select a learning style",
  }),
  teachingApproach: z.enum(["structured", "flexible", "challenging", "supportive"], {
    required_error: "You need to select a teaching approach",
  }).optional(),
  privacy: z.object({
    privateProfile: z.boolean().default(false),
    allowMessages: z.boolean().default(true),
    notifications: z.boolean().default(true),
  }),
}); 