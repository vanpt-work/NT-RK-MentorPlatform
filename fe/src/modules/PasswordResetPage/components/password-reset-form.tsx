import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/common/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Progress } from "@/common/components/ui/progress";
import { newPasswordSchema, otpSchema } from "../utils/schemas";
import LoadingSpinner from "@/common/components/loading-spinner";

// Define schema for email form
const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});


export function PasswordResetForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Form state for email
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form state for OTP verification
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Form state for new password
  const passwordForm = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Update OTP value whenever otpValues changes
  useEffect(() => {
    const otpString = otpValues.join("");
    otpForm.setValue("otp", otpString);
  }, [otpValues, otpForm]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    // Only take the last character if more than one is pasted/entered
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);

    // Auto focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard navigation between OTP inputs
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste for OTP
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const digits = pastedData.slice(0, 6).split("");
    const newOtpValues = [...otpValues];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtpValues[index] = digit;
      }
    });

    setOtpValues(newOtpValues);
    
    // Focus the input after the last filled position
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus();
    }
  };

  // Request password reset
  async function requestReset(values: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement API call to request reset
      console.log("Requesting password reset for:", values.email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      console.error("Password reset request failed:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Verify OTP
  async function verifyOTP(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement API call to verify OTP
      console.log("Verifying OTP:", values.otp);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Reset password
  async function resetPassword(values: z.infer<typeof newPasswordSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement API call to reset password
      console.log(values)
      console.log("Resetting password for:", emailForm.getValues().email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      console.error("Password reset failed:", err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          {step === 1
            ? "Enter your email address to receive a verification code"
            : step === 2
            ? "Enter the 6-digit code sent to your email"
            : ""}
        </CardDescription>
        {!isSubmitted && (
          <div className="my-4">
            <Progress value={step * 33.33} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <div className="flex-1 text-center">
                <span className={step >= 1 ? "text-primary font-medium" : ""}>Email</span>
              </div>
              <div className="flex-1 text-center">
                <span className={step >= 2 ? "text-primary font-medium" : ""}>Verification</span>
              </div>
              <div className="flex-1 text-center">
                <span className={step >= 3 ? "text-primary font-medium" : ""}>New Password</span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Password Reset Complete
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={emailForm.handleSubmit(requestReset)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...emailForm.register("email")}
              />
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-500">{emailForm.formState.errors.email.message}</p>
              )}
            </div>
            
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={otpForm.handleSubmit(verifyOTP)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp-inputs">Verification Code</Label>
              
              <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                      return undefined;
                    }}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-semibold"
                    value={otpValues[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              
              <input
                type="hidden"
                {...otpForm.register("otp")}
                value={otpValues.join("")}
              />
              
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-500">{otpForm.formState.errors.otp.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit code to {emailForm.getValues().email}
              </p>
            </div>
            
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={passwordForm.handleSubmit(resetPassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...passwordForm.register("password")}
              />
              {passwordForm.formState.errors.password && (
                <p className="text-sm text-red-500">{passwordForm.formState.errors.password.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include uppercase, lowercase, number and special character.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Resetting...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="text-sm text-muted-foreground">
          <a href="/login" className="text-primary underline-offset-4 hover:underline inline-flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Return to Login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
