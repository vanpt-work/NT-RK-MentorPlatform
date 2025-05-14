import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    rememberMe: z.boolean().optional().default(false),
});
