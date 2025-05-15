import * as z from "zod";

export const otpSchema = z.object({
    otp: z.string().length(6, "Please enter a 6-digit code"),
});
