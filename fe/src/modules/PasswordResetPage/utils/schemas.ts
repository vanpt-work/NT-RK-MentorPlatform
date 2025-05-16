import * as z from "zod";

import {
    OTP_HAS_INVALID_CHARACTERS,
    OTP_HAS_INVALID_LENGTH,
    PASSWORDS_DO_NOT_MATCH,
    PASSWORD_CANNOT_BE_BLANK,
    PASSWORD_IS_INVALID,
} from "@/common/constants";

// Define schema for OTP verification
export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, OTP_HAS_INVALID_LENGTH)
        .regex(/^\d+$/, OTP_HAS_INVALID_CHARACTERS),
});

// Define schema for new password
export const newPasswordSchema = z
    .object({
        password: z
            .string()
            .nonempty(PASSWORD_CANNOT_BE_BLANK)
            .regex(
                /^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
                PASSWORD_IS_INVALID,
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: PASSWORDS_DO_NOT_MATCH,
        path: ["confirmPassword"],
    });
