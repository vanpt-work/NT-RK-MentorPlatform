import * as z from "zod";

// Step 1: Account Information
export const accountSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
    // Additional validation check could be added here for "Email already is registered"
    // This would typically happen server-side

  password: z
    .string()
    .min(8, "Password must be 8–32 characters and include uppercase, lowercase, number & special character.")
    .max(32, "Password must be 8–32 characters and include uppercase, lowercase, number & special character.")
    .refine(value => value.length > 0, "Password must not be empty.")
    .refine(
      value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value),
      "Password must be 8–32 characters and include uppercase, lowercase, number & special character."
    ),

  confirmPassword: z
    .string()
    .min(8, "Password must be 8–32 characters.")
    .max(32, "Password must be 8–32 characters."),

  termsAgreed: z
    .boolean()
    .refine(value => value === true, 
      "Please agree to the Terms of Service and Privacy Policy."
    ),
}).refine(
  data => data.password === data.confirmPassword,
  {
    message: "Confirm password do not match with password.",
    path: ["confirmPassword"],
  }
);

// Step 2: Role & Profile Information
export const profileSchema = z.object({
  photo: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Photo must not exceed 5MB"
    ),
  
  fullName: z
    .string()
    .trim()
    .min(3, "Fullname must be at least 3 characters.")
    .max(200, "Fullname must be 200 characters max.")
    .refine((value) => value.length > 0, "Fullname must not be empty."),
  
  role: z
    .enum(["Learner", "Mentor"], { 
      required_error: "Role invalid, please choose valid value." 
    }),
  
  bio: z
    .string()
    .trim()
    .max(2000, "Bio must be 2000 characters max.")
    .optional(),
  
  expertise: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.every(id => typeof id === "string"),
      "Areas of expertises have invalid value."
    ),
  
  professionalSkills: z
    .string()
    .trim()
    .max(200, "Professional skills must be 200 characters max.")
    .optional(),
  
  industryExperience: z
    .string()
    .trim()
    .max(200, "Industry experience must be 200 characters max.")
    .optional(),
  
  availability: z
    .array(z.string())
    .refine(
      (val) => val.every(id => typeof id === "string"),
      "Your availability have invalid value."
    ),
  
  communicationMethod: z
    .enum(["Video call", "Audio call", "Text chat"], {
      required_error: "Preferred communication method invalid."
    }),
  
  goals: z
    .string()
    .trim()
    .max(200, "Goals must be 200 characters max.")
    .optional(),
});

// Step 3: Preferences
export const preferencesSchema = z.object({
  topics: z
    .array(z.string())
    .optional()
    .refine(
      (val) => !val || val.every(id => typeof id === "string"),
      "Topics chosen have invalid value"
    ),
  
  sessionFrequency: z
    .enum(["Weekly", "Every two weeks", "Monthly", "As Needed"], { 
      required_error: "Preferred session frequency invalid." 
    }),
  
  sessionDuration: z
    .enum(["30 minutes", "45 minutes", "1 hour", "1.5 hours", "2 hours"], { 
      required_error: "Preferred session duration invalid." 
    }),
  
  learningStyle: z
    .string()
    .refine(
      (val) => typeof val === "string",
      "Your preferred learning style invalid."
    ),
  
  teachingApproach: z
    .enum(["handson", "discussion", "project", "lecture"], {
      required_error: "Teaching approach invalid."
    })
    .optional(),
  
  privacySettings: z.object({
    privateProfile: z.boolean().default(false),  
    allowMessages: z.boolean().default(true),
    receiveNotifications: z.boolean().default(true)
  }).optional(),
});