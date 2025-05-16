import type { z } from "zod";
import { otpSchema } from "../utils/schemas";

export type OTPFormValues = z.infer<typeof otpSchema>;