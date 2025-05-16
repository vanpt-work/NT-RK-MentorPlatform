import * as z from "zod";

import { OTP_HAS_INVALID_LENGTH } from "@/common/constants";

export const otpSchema = z.object({
    otp: z.string().length(6, OTP_HAS_INVALID_LENGTH),
});
