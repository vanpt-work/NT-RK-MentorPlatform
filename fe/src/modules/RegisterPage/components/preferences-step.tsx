import {
    BookOpen,
    Ear,
    Eye,
    GraduationCap,
    Hammer,
    Lightbulb,
    MessagesSquare,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import LoadingSpinner from "@/common/components/loading-spinner";
import { Checkbox } from "@/common/components/ui/checkbox";
import { Label } from "@/common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";

import registerService from "../services/registerServices";
import {
    type CourseCategory,
    type PreferencesStepProps,
    type SessionDurationType,
    type SessionFrequencyType,
} from "../types";

export function PreferencesStep({
    form,
    role,
    onSubmit,
}: PreferencesStepProps) {
    const [categories, setCategories] = useState<CourseCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await registerService.getAllCourseCategories();
                if (response.data) {
                    setCategories(response.data.items);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.error("Failed to fetch course categories:", error);
                toast.error(
                    "Failed to fetch course categories. Please try again!",
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    console.log(categories);

    // Handle topics selection
    const handleTopicChange = (categoryId: string) => {
        const currentTopics = form.getValues("courseCategoryIds") || [];
        const updatedTopics = currentTopics.includes(categoryId)
            ? currentTopics.filter((id) => id !== categoryId)
            : [...currentTopics, categoryId];

        form.setValue("courseCategoryIds", updatedTopics, {
            shouldValidate: true,
        });
    };

    // Find category name by ID
    const getCategoryName = (id: string) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.name : id;
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
                            <div className="relative flex min-h-20 flex-wrap gap-2 rounded-lg border p-3">
                                {isLoading ? (
                                    <div className="flex w-full items-center justify-center py-2">
                                        <LoadingSpinner size="sm" />
                                        <span className="text-muted-foreground ml-2 text-sm">
                                            Loading topics...
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        {(
                                            form.getValues(
                                                "courseCategoryIds",
                                            ) || []
                                        ).map((categoryId) => (
                                            <div
                                                key={categoryId}
                                                className="bg-muted flex items-center gap-1 rounded-md px-2 py-1 text-sm"
                                            >
                                                {getCategoryName(categoryId)}
                                                <button
                                                    type="button"
                                                    className="hover:bg-muted-foreground/20 inline-flex h-4 w-4 items-center justify-center rounded-full"
                                                    onClick={() =>
                                                        handleTopicChange(
                                                            categoryId,
                                                        )
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <Select
                                            onValueChange={(value) => {
                                                handleTopicChange(value);
                                                form.trigger(
                                                    "courseCategoryIds",
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="h-8 w-full border-0 bg-transparent p-0 hover:bg-transparent focus:ring-0">
                                                <SelectValue placeholder="Select topics" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories
                                                    .filter(
                                                        (category) =>
                                                            !(
                                                                form.getValues(
                                                                    "courseCategoryIds",
                                                                ) || []
                                                            ).includes(
                                                                category.id,
                                                            ),
                                                    )
                                                    .map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Select topics you're interested in for
                                mentorship
                            </p>
                            {form.formState.errors.courseCategoryIds && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.courseCategoryIds
                                            .message
                                    }
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
                                        form.getValues("learningStyle") ===
                                        "Visual"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue(
                                            "learningStyle",
                                            "Visual",
                                            { shouldValidate: true },
                                        );
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Eye className="text-primary h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        Visual
                                    </span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") ===
                                        "Auditory"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue(
                                            "learningStyle",
                                            "Auditory",
                                            { shouldValidate: true },
                                        );
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Ear className="text-primary h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        Auditory
                                    </span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") ===
                                        "Reading/Writing"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue(
                                            "learningStyle",
                                            "Reading/Writing",
                                            { shouldValidate: true },
                                        );
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <BookOpen className="text-primary h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        Reading/Writing
                                    </span>
                                </div>
                                <div
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        form.getValues("learningStyle") ===
                                        "Kinesthetic"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue(
                                            "learningStyle",
                                            "Kinesthetic",
                                            { shouldValidate: true },
                                        );
                                        form.trigger("learningStyle");
                                    }}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Hammer className="text-primary h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        Kinesthetic
                                    </span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Select the learning style that works best for
                                you
                            </p>
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
                                            form.getValues("teachingStyles") ===
                                            "handson"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue(
                                                "teachingStyles",
                                                "handson",
                                                { shouldValidate: true },
                                            );
                                            form.trigger("teachingStyles");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <Hammer className="text-primary h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Hands-on Practice
                                        </span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingStyles") ===
                                            "discussion"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue(
                                                "teachingStyles",
                                                "discussion",
                                                { shouldValidate: true },
                                            );
                                            form.trigger("teachingStyles");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <MessagesSquare className="text-primary h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Discussion Base
                                        </span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingStyles") ===
                                            "project"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue(
                                                "teachingStyles",
                                                "project",
                                                { shouldValidate: true },
                                            );
                                            form.trigger("teachingStyles");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <Lightbulb className="text-primary h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Project Based
                                        </span>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                            form.getValues("teachingStyles") ===
                                            "lecture"
                                                ? "border-primary bg-primary/5"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() => {
                                            form.setValue(
                                                "teachingStyles",
                                                "lecture",
                                                { shouldValidate: true },
                                            );
                                            form.trigger("teachingStyles");
                                        }}
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <GraduationCap className="text-primary h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Lecture Style
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    Select your preferred teaching approach as a
                                    mentor
                                </p>
                                {form.formState.errors.teachingStyles && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors.teachingStyles
                                                ?.message
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
                                defaultValue={
                                    form.getValues("sessionFrequency") ||
                                    "Weekly"
                                }
                                onValueChange={(
                                    value: SessionFrequencyType,
                                ) => {
                                    form.setValue("sessionFrequency", value, {
                                        shouldValidate: true,
                                    });
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
                            <p className="text-muted-foreground text-xs">
                                How often would you like to have mentorship
                                sessions
                            </p>
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
                                defaultValue={
                                    form.getValues("duration") || "1 hour"
                                }
                                onValueChange={(value: SessionDurationType) => {
                                    form.setValue("duration", value, {
                                        shouldValidate: true,
                                    });
                                    form.trigger("duration");
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
                            <p className="text-muted-foreground text-xs">
                                How long would you like each session to be
                            </p>
                            {form.formState.errors.duration && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.duration.message}
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
                                checked={
                                    form.getValues("privacySettings")
                                        ?.isPrivateProfile
                                }
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues(
                                        "privacySettings",
                                    ) || {
                                        isPrivateProfile: false,
                                        isReceiveMessage: true,
                                        isNotification: true,
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            isPrivateProfile: checked === true,
                                        },
                                        {
                                            shouldValidate: true,
                                        },
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
                                checked={
                                    form.getValues("privacySettings")
                                        ?.isReceiveMessage
                                }
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues(
                                        "privacySettings",
                                    ) || {
                                        isPrivateProfile: false,
                                        allowMessages: true,
                                        isNotification: true,
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            isReceiveMessage: checked === true,
                                        },
                                        {
                                            shouldValidate: true,
                                        },
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
                                checked={
                                    form.getValues("privacySettings")
                                        ?.isNotification
                                }
                                onCheckedChange={(checked) => {
                                    const currentSettings = form.getValues(
                                        "privacySettings",
                                    ) || {
                                        isPrivateProfile: false,
                                        isReceiveMessage: true,
                                        isNotification: true,
                                    };
                                    form.setValue(
                                        "privacySettings",
                                        {
                                            ...currentSettings,
                                            isNotification: checked === true,
                                        },
                                        {
                                            shouldValidate: true,
                                        },
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
                    <p className="text-muted-foreground text-xs">
                        These settings can be changed later in your profile
                    </p>
                </div>
            </div>
        </form>
    );
}
