import * as z from "zod";

import {
    EMAIL_CANNOT_BE_BLANK,
    PASSWORD_CANNOT_BE_BLANK,
} from "@/common/constants";

export const loginSchema = z.object({
    email: z.string().nonempty(EMAIL_CANNOT_BE_BLANK),

    password: z.string().nonempty(PASSWORD_CANNOT_BE_BLANK),

    rememberMe: z.boolean().optional().default(false),
});
