import type { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/common/components/ui/checkbox";
import { Label } from "@/common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";

import type { PreferencesFormValues } from "../types/Account";
import { expertiseAreas } from "../types/Account";

type PreferencesStepProps = {
    form: UseFormReturn<PreferencesFormValues>;
    role: "learner" | "mentor";
    onSubmit: () => void;
};

export function PreferencesStep({
    form,
    role,
    onSubmit,
}: PreferencesStepProps) {
    // Handle interests selection
    const handleInterestChange = (interest: string) => {
        const currentInterests = form.getValues("interests") || [];
        const updatedInterests = currentInterests.includes(interest)
            ? currentInterests.filter((i) => i !== interest)
            : [...currentInterests, interest];

        form.setValue("interests", updatedInterests, {
            shouldValidate: true,
        });
    };

    return (
        <form
            className="space-y-8"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            {/* Interests & Learning Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">
                    Interests & Learning Style
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label>Topics of Interest</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {expertiseAreas.map((interest) => (
                                    <div
                                        key={interest}
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            (
                                                form.getValues("interests") ||
                                                []
                                            ).includes(interest)
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() =>
                                            handleInterestChange(interest)
                                        }
                                    >
                                        <span className="text-sm font-medium">
                                            {interest}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {form.formState.errors.interests && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.interests.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="learningStyle">
                                Your Learning Style
                            </Label>
                            <Select
                                defaultValue={form.getValues("learningStyle")}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "learningStyle",
                                        value as
                                            | "visual"
                                            | "auditory"
                                            | "reading"
                                            | "kinesthetic",
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select learning style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="visual">
                                        Visual (learn through seeing)
                                    </SelectItem>
                                    <SelectItem value="auditory">
                                        Auditory (learn through hearing)
                                    </SelectItem>
                                    <SelectItem value="reading">
                                        Reading/Writing (learn through text)
                                    </SelectItem>
                                    <SelectItem value="kinesthetic">
                                        Kinesthetic (learn through doing)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.learningStyle && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.learningStyle
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        {role === "mentor" && (
                            <div className="space-y-3">
                                <Label htmlFor="teachingApproach">
                                    Your Teaching Approach
                                </Label>
                                <Select
                                    defaultValue={
                                        form.getValues("teachingApproach") || ""
                                    }
                                    onValueChange={(value) =>
                                        form.setValue(
                                            "teachingApproach",
                                            value as
                                                | "structured"
                                                | "flexible"
                                                | "challenging"
                                                | "supportive",
                                            {
                                                shouldValidate: true,
                                            },
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teaching approach" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="structured">
                                            Structured (organized, methodical)
                                        </SelectItem>
                                        <SelectItem value="flexible">
                                            Flexible (adaptive, responsive)
                                        </SelectItem>
                                        <SelectItem value="challenging">
                                            Challenging (push boundaries)
                                        </SelectItem>
                                        <SelectItem value="supportive">
                                            Supportive (encouraging, patient)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.teachingApproach && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors
                                                .teachingApproach.message
                                        }
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Session Preferences Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">
                    Session Preferences
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="sessionFrequency">
                                Preferred Session Frequency
                            </Label>
                            <Select
                                defaultValue={form.getValues(
                                    "sessionFrequency",
                                )}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "sessionFrequency",
                                        value as
                                            | "weekly"
                                            | "biweekly"
                                            | "monthly",
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">
                                        Weekly
                                    </SelectItem>
                                    <SelectItem value="biweekly">
                                        Bi-weekly
                                    </SelectItem>
                                    <SelectItem value="monthly">
                                        Monthly
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.sessionFrequency && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.sessionFrequency
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="sessionDuration">
                                Preferred Session Duration
                            </Label>
                            <Select
                                defaultValue={form.getValues("sessionDuration")}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "sessionDuration",
                                        value as "30min" | "60min" | "90min",
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30min">
                                        30 minutes
                                    </SelectItem>
                                    <SelectItem value="60min">
                                        60 minutes
                                    </SelectItem>
                                    <SelectItem value="90min">
                                        90 minutes
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.sessionDuration && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.sessionDuration
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Settings Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">Privacy Settings</h3>
                <div className="space-y-3">
                    <Label>Privacy Options</Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 rounded-lg border p-3">
                            <Checkbox
                                id="privateProfile"
                                checked={form.getValues(
                                    "privacy.privateProfile",
                                )}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        "privacy.privateProfile",
                                        checked === true,
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            />
                            <Label
                                htmlFor="privateProfile"
                                className="text-sm font-medium"
                            >
                                Make my profile private
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-3">
                            <Checkbox
                                id="allowMessages"
                                checked={form.getValues(
                                    "privacy.allowMessages",
                                )}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        "privacy.allowMessages",
                                        checked === true,
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            />
                            <Label
                                htmlFor="allowMessages"
                                className="text-sm font-medium"
                            >
                                Allow messages from other users
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-3">
                            <Checkbox
                                id="notifications"
                                checked={form.getValues(
                                    "privacy.notifications",
                                )}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        "privacy.notifications",
                                        checked === true,
                                        {
                                            shouldValidate: true,
                                        },
                                    )
                                }
                            />
                            <Label
                                htmlFor="notifications"
                                className="text-sm font-medium"
                            >
                                Receive email notifications
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
