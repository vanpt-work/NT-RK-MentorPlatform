import { Checkbox } from "@/common/components/ui/checkbox";
import { Label } from "@/common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";

import { interestTopics, type PreferencesStepProps, type SessionDurationType, type SessionFrequencyType } from "../types";
import { BookOpen, Ear, Eye, GraduationCap, Hammer, Lightbulb, MessagesSquare, X } from "lucide-react";

export function PreferencesStep({
    form,
    role,
    onSubmit,
}: PreferencesStepProps) {
    // Handle topics selection
    const handleTopicChange = (topic: string) => {
        const currentTopics = form.getValues("topics") || [];
        const updatedTopics = currentTopics.includes(topic)
            ? currentTopics.filter((i) => i !== topic)
            : [...currentTopics, topic];

        form.setValue("topics", updatedTopics, {
            shouldValidate: true,
        });
    };

    return (
        <form
            className="space-y-8"
            onChange={() => form.trigger()}
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
                            <div className="relative border rounded-lg p-3 min-h-20 flex flex-wrap gap-2">
                                {(form.getValues("topics") || []).map((topic) => (
                                    <div
                                        key={topic}
                                        className="bg-muted rounded-md px-2 py-1 text-sm flex items-center gap-1"
                                    >
                                        {topic}
                                        <button
                                            type="button"
                                            className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-muted-foreground/20"
                                            onClick={() => handleTopicChange(topic)}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Select
                                    onValueChange={(value) => {
                                        handleTopicChange(value);
                                        form.trigger("topics");
                                    }}
                                >
                                    <SelectTrigger className="w-full border-0 p-0 h-8 bg-transparent hover:bg-transparent focus:ring-0">
                                        <SelectValue placeholder="Select topics..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {interestTopics
                                            .filter(topic => !(form.getValues("topics") || []).includes(topic))
                                            .map((topic) => (
                                                <SelectItem key={topic} value={topic}>
                                                    {topic}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {form.formState.errors.topics && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.topics.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="learningStyle">
                                Your Learning Style
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") === "Visual"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue("learningStyle", "Visual", { shouldValidate: true });
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Eye className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Visual</span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") === "Auditory"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue("learningStyle", "Auditory", { shouldValidate: true });
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Ear className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Auditory</span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") === "Reading"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue("learningStyle", "Reading", { shouldValidate: true });
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Reading/Writing</span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") === "Kinesthetic"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue("learningStyle", "Kinesthetic", { shouldValidate: true });
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Hammer className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Kinesthetic</span>
                                </div>
                            </div>
                            {form.formState.errors.learningStyle && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.learningStyle
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        {role === "Mentor" && (
                            <div className="space-y-3">
                                <Label htmlFor="teachingApproach">
                                    Your Teaching Approach
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingApproach") === "handson"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue("teachingApproach", "handson", { shouldValidate: true });
                                            form.trigger("teachingApproach");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <Hammer className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Hands-on Practice</span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingApproach") === "discussion"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue("teachingApproach", "discussion", { shouldValidate: true });
                                            form.trigger("teachingApproach");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <MessagesSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Discussion Base</span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingApproach") === "project"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue("teachingApproach", "project", { shouldValidate: true });
                                            form.trigger("teachingApproach");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <Lightbulb className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Project Based</span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingApproach") === "lecture"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue("teachingApproach", "lecture", { shouldValidate: true });
                                            form.trigger("teachingApproach");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <GraduationCap className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">Lecture Style</span>
                                    </div>
                                </div>
                                {form.formState.errors.teachingApproach && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors
                                                .teachingApproach?.message
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
                                ) || "Weekly"}
                                onValueChange={(value: SessionFrequencyType) => {
                                    form.setValue(
                                        "sessionFrequency",
                                        value,
                                        {
                                            shouldValidate: true,
                                        },
                                    );
                                    form.trigger("sessionFrequency");
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Weekly">
                                        Weekly
                                    </SelectItem>
                                    <SelectItem value="Every two weeks">
                                        Every two weeks
                                    </SelectItem>
                                    <SelectItem value="Monthly">
                                        Monthly
                                    </SelectItem>
                                    <SelectItem value="As Needed">
                                        As Needed
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
                                defaultValue={form.getValues("sessionDuration") || "1 hour"}
                                onValueChange={(value: SessionDurationType) => {
                                    form.setValue(
                                        "sessionDuration",
                                        value,
                                        {
                                            shouldValidate: true,
                                        },
                                    );
                                    form.trigger("sessionDuration");
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30 minutes">
                                        30 minutes
                                    </SelectItem>
                                    <SelectItem value="45 minutes">
                                        45 minutes
                                    </SelectItem>
                                    <SelectItem value="1 hour">
                                        1 hour
                                    </SelectItem>
                                    <SelectItem value="1.5 hours">
                                        1.5 hours
                                    </SelectItem>
                                    <SelectItem value="2 hours">
                                        2 hours
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
                                checked={form.getValues("privacySettings")?.privateProfile}
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues("privacySettings") || {
                                        privateProfile: false,
                                        allowMessages: true,
                                        receiveNotifications: true
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            privateProfile: checked === true
                                        },
                                        {
                                            shouldValidate: true,
                                        }
                                    );
                                    form.trigger("privacySettings");
                                }}
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
                                checked={form.getValues("privacySettings")?.allowMessages}
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues("privacySettings") || {
                                        privateProfile: false,
                                        allowMessages: true,
                                        receiveNotifications: true
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            allowMessages: checked === true
                                        },
                                        {
                                            shouldValidate: true,
                                        }
                                    );
                                    form.trigger("privacySettings");
                                }}
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
                                id="receiveNotifications"
                                checked={form.getValues("privacySettings")?.receiveNotifications}
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues("privacySettings") || {
                                        privateProfile: false,
                                        allowMessages: true,
                                        receiveNotifications: true
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            receiveNotifications: checked === true
                                        },
                                        {
                                            shouldValidate: true,
                                        }
                                    );
                                    form.trigger("privacySettings");
                                }}
                            />
                            <Label
                                htmlFor="receiveNotifications"
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
