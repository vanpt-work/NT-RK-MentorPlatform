import { z } from "zod";
import { accountSchema, profileSchema, preferencesSchema } from "../utils/schemas";

// Define types from schemas
export type AccountFormValues = z.infer<typeof accountSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;

// Explicit preference form type
export type PreferencesFormValues = z.infer<typeof preferencesSchema>;

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