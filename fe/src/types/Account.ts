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

export const professionalSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "UI/UX Design",
  "Product Management",
  "Digital Marketing",
  "Data Analysis",
  "Machine Learning",
  "Public Speaking",
];

export const availabilitySlots = [
  "Weekdays Morning",
  "Weekdays Afternoon",
  "Weekdays Evening",
  "Weekend Morning",
  "Weekend Afternoon",
  "Weekend Evening",
]; 