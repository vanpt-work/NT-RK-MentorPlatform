import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

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
import LoadingSpinner from "@/common/components/loading-spinner";
import { otpSchema } from "../utils/schemas";
import type { OTPFormValues } from "../types";

type OTPVerificationFormProps = {
    email: string;
    onVerificationSuccess: () => void;
    onBack?: () => void;
    purpose: "registration" | "login";
}

export function OTPVerificationForm({
    email,
    onVerificationSuccess,
    onBack,
    purpose,
}: OTPVerificationFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Form state for OTP verification
    const otpForm = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
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

    // Resend OTP countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (!canResendOtp) {
            timer = setInterval(() => {
                setResendCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCanResendOtp(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        
        return () => clearInterval(timer);
    }, [canResendOtp]);

    // Send OTP verification request
    const sendOtpVerification = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with actual API call to send OTP
            console.log("Sending OTP to:", email);
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            // Reset countdown for resend button
            setCanResendOtp(false);
            setResendCountdown(60);
            
            toast.success("OTP has been sent! Please check your email.");
        } catch (error) {
            console.error("Failed to send OTP:", error);
            setError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Automatically send OTP on first mount
    useEffect(() => {
        sendOtpVerification();
    }, []);
    
    // Resend OTP
    const resendOtp = async () => {
        if (!canResendOtp) return;
        await sendOtpVerification();
    };
    
    // Verify OTP
    const verifyOtp = async (values: OTPFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with actual API call to verify OTP
            console.log("Verifying OTP:", values.otp);
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // Call success callback
            onVerificationSuccess();
            
            toast.success(
                purpose === "registration" 
                    ? "Email verification successful! Completing registration..." 
                    : "Email verification successful! Redirecting to home page..."
            );
        } catch (error) {
            console.error("OTP verification failed:", error);
            setError("OTP verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">
                    Email Verification
                </CardTitle>
                <CardDescription className="text-center">
                    Enter the 6-digit code sent to {email}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="otp-inputs">OTP</Label>
                        
                        <div className="flex justify-center mx-auto" onPaste={handleOtpPaste}>
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <Input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                        return undefined;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-xl font-semibold m-2 p-0"
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
                        
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        
                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground mb-2">
                                Didn't receive the OTP?
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resendOtp}
                                disabled={!canResendOtp || isLoading}
                            >
                                {canResendOtp
                                    ? "Resend OTP"
                                    : `Resend after ${resendCountdown}s`}
                            </Button>
                        </div>
                    </div>
                    
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingSpinner size="sm" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            "Verify"
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                {onBack && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onBack}
                        className="w-full"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}