import * as z from "zod";

import {
    EMAIL_CANNOT_BE_BLANK,
    EMAIL_HAS_INVALID_LENGTH,
    EMAIL_IS_INVALID,
    PASSWORD_CANNOT_BE_BLANK,
    PASSWORD_IS_INVALID,
} from "@/common/constants";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty(EMAIL_CANNOT_BE_BLANK)
        .min(8, EMAIL_HAS_INVALID_LENGTH)
        .max(50, EMAIL_HAS_INVALID_LENGTH)
        .regex(
            /^(?=.{8,50}$)[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
            EMAIL_IS_INVALID,
        ),

    password: z
        .string()
        .nonempty(PASSWORD_CANNOT_BE_BLANK)
        .regex(
            /^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
            PASSWORD_IS_INVALID,
        ),

    rememberMe: z.boolean().optional().default(false),
});
