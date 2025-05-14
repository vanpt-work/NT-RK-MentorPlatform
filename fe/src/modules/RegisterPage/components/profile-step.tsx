import {
    BarChart4,
    Briefcase,
    ClipboardList,
    Code,
    Database,
    GraduationCap,
    Lightbulb,
    LineChart,
    MessageSquare,
    MessagesSquare,
    Palette,
    Phone,
    Users,
    Video,
} from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import { Textarea } from "@/common/components/ui/textarea";

import type { ProfileFormValues } from "../types/Account";
import {
    availabilitySlots,
    expertiseAreas,
} from "../types/Account";

type ProfileStepProps = {
    form: UseFormReturn<ProfileFormValues>;
    avatarPreview: string | null;
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hideRoleSelection?: boolean;
};

export function ProfileStep({
    form,
    avatarPreview,
    onAvatarChange,
    hideRoleSelection = false,
}: ProfileStepProps) {
    // Handle expertise selection
    const handleExpertiseChange = (expertise: string) => {
        const currentExpertise = form.getValues("expertise") || [];
        const updatedExpertise = currentExpertise.includes(expertise)
            ? currentExpertise.filter((e) => e !== expertise)
            : [...currentExpertise, expertise];

        form.setValue("expertise", updatedExpertise, {
            shouldValidate: true,
        });
    };

    // Handle professional skills selection
    const handleSkillChange = (skill: string) => {
        // Get current skills as string
        const currentSkillsStr = form.getValues("professionalSkills") || "";
        const currentSkills = currentSkillsStr ? currentSkillsStr.split(", ") : [];
        
        // Check if skill is already included
        const hasSkill = currentSkills.includes(skill);
        
        // Create new skills array
        let updatedSkills;
        if (hasSkill) {
            updatedSkills = currentSkills.filter(s => s !== skill);
        } else {
            updatedSkills = [...currentSkills, skill];
        }
        
        // Join back to string
        form.setValue("professionalSkills", updatedSkills.join(", "), {
            shouldValidate: true,
        });
    };

    // Handle availability selection
    const handleAvailabilityChange = (slot: string) => {
        const currentAvailability = form.getValues("availability") || [];
        const updatedAvailability = currentAvailability.includes(slot)
            ? currentAvailability.filter((a) => a !== slot)
            : [...currentAvailability, slot];

        form.setValue("availability", updatedAvailability, {
            shouldValidate: true,
        });
    };

    // Check if a skill is selected
    const isSkillSelected = (skill: string) => {
        const currentSkillsStr = form.getValues("professionalSkills") || "";
        const currentSkills = currentSkillsStr ? currentSkillsStr.split(", ") : [];
        return currentSkills.includes(skill);
    };

    // Handle communication method selection
    const handleCommunicationChange = (method: "Video call" | "Audio call" | "Text chat") => {
        form.setValue("communicationMethod", method, {
            shouldValidate: true,
        });
    };

    return (
        <form className="space-y-8">
            {!hideRoleSelection && (
                <div className="mb-6 pt-2">
                    <h3 className="mb-2 text-lg font-medium">I am joining as:</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div
                            className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all ${
                                form.getValues("role") === "Learner"
                                    ? "border-primary bg-primary/5"
                                    : "hover:border-gray-400"
                            }`}
                            onClick={() =>
                                form.setValue("role", "Learner", {
                                    shouldValidate: true,
                                })
                            }
                        >
                            <div className="mb-2 flex h-16 w-16 items-center justify-center">
                                <GraduationCap className="text-primary h-12 w-12" />
                            </div>
                            <h4 className="text-lg font-medium">Learner</h4>
                            <p className="text-muted-foreground text-sm">
                                I want to find mentors
                            </p>
                        </div>
                        
                        <div
                            className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all ${
                                form.getValues("role") === "Mentor"
                                    ? "border-primary bg-primary/5"
                                    : "hover:border-gray-400"
                            }`}
                            onClick={() =>
                                form.setValue("role", "Mentor", {
                                    shouldValidate: true,
                                })
                            }
                        >
                            <div className="mb-2 flex h-16 w-16 items-center justify-center">
                                <Users className="text-primary h-12 w-12" />
                            </div>
                            <h4 className="text-lg font-medium">Mentor</h4>
                            <p className="text-muted-foreground text-sm">
                                I want to mentor others
                            </p>
                        </div>
                    </div>
                    {form.formState.errors.role && (
                        <p className="mt-2 text-sm text-red-500">
                            {form.formState.errors.role.message}
                        </p>
                    )}
                </div>
            )}

            {/* Profile Information Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">
                    Basic Profile Information
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...form.register("fullName")}
                            />
                            {form.formState.errors.fullName && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                className="min-h-24"
                                {...form.register("bio")}
                            />
                            {form.formState.errors.bio && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.bio.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label>Profile Picture</Label>
                            <div className="flex flex-col items-center space-y-2">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={avatarPreview || ""} />
                                    <AvatarFallback>
                                        {form
                                            .getValues("fullName")
                                            ?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="relative">
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={onAvatarChange}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            document
                                                .getElementById("photo")
                                                ?.click()
                                        }
                                    >
                                        Upload Photo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expertise Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">Expertise & Skills</h3>
                <div className="space-y-6">
                    {/* Expertise and Skills row */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label>Areas of Expertise</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {expertiseAreas.map((expertise) => {
                                    let Icon;
                                    switch (expertise) {
                                        case "Leadership":
                                            Icon = BarChart4;
                                            break;
                                        case "Programming":
                                            Icon = Code;
                                            break;
                                        case "Design":
                                            Icon = Palette;
                                            break;
                                        case "Marketing":
                                            Icon = LineChart;
                                            break;
                                        case "Data Science":
                                            Icon = Database;
                                            break;
                                        case "Business":
                                            Icon = Briefcase;
                                            break;
                                        case "Project Management":
                                            Icon = ClipboardList;
                                            break;
                                        case "Communication":
                                            Icon = MessagesSquare;
                                            break;
                                        default:
                                            Icon = Lightbulb;
                                    }

                                    return (
                                        <div
                                            key={expertise}
                                            className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                                (
                                                    form.getValues(
                                                        "expertise",
                                                    ) || []
                                                ).includes(expertise)
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:border-gray-400"
                                            }`}
                                            onClick={() =>
                                                handleExpertiseChange(expertise)
                                            }
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center">
                                                <Icon className="text-primary h-6 w-6" />
                                            </div>
                                            <span className="text-sm font-medium">
                                                {expertise}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {form.formState.errors.expertise && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.expertise.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Professional Skills</Label>
                                <Textarea
                                    id="professionalSkills"
                                    placeholder="e.g. JavaScript, Project Management, Research"
                                    className="min-h-16"
                                    {...form.register("professionalSkills")}
                                />
                                {form.formState.errors.professionalSkills && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors.professionalSkills
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="industryExperience">Industry Experience</Label>
                                <Textarea
                                    id="industryExperience"
                                    placeholder="e.g. 5 years in Tech, 3 years in Finance"
                                    className="min-h-16"
                                    {...form.register("industryExperience")}
                                />
                                {form.formState.errors.industryExperience && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.industryExperience.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Goals row */}
                    <div className="grid grid-cols-1">
                        <div className="space-y-3">
                            <Label htmlFor="goals">Goals</Label>
                            <Textarea
                                id="goals"
                                placeholder="What do you want to achieve?"
                                className="min-h-16"
                                {...form.register("goals")}
                            />
                            {form.formState.errors.goals && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.goals.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Availability Block */}
            <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">
                    Communication & Availability
                </h3>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="communicationMethod">
                            Preferred Communication Method
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            <div
                                className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                    form.getValues("communicationMethod") === "Video call"
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-gray-400"
                                }`}
                                onClick={() => handleCommunicationChange("Video call")}
                            >
                                <div className="flex h-6 w-6 items-center justify-center">
                                    <Video className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Video Call</span>
                            </div>
                            <div
                                className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                    form.getValues("communicationMethod") === "Audio call"
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-gray-400"
                                }`}
                                onClick={() => handleCommunicationChange("Audio call")}
                            >
                                <div className="flex h-6 w-6 items-center justify-center">
                                    <Phone className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Audio Call</span>
                            </div>
                            <div
                                className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                    form.getValues("communicationMethod") === "Text chat"
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-gray-400"
                                }`}
                                onClick={() => handleCommunicationChange("Text chat")}
                            >
                                <div className="flex h-6 w-6 items-center justify-center">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Text Chat</span>
                            </div>
                        </div>
                        {form.formState.errors.communicationMethod && (
                            <p className="text-sm text-red-500">
                                {
                                    form.formState.errors.communicationMethod
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label>Your Availability</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {availabilitySlots.map((slot) => (
                                <div
                                    key={slot}
                                    className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-all ${
                                        (
                                            form.getValues(
                                                "availability",
                                            ) || []
                                        ).includes(slot)
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-gray-400"
                                    }`}
                                    onClick={() =>
                                        handleAvailabilityChange(slot)
                                    }
                                >
                                    <span className="text-sm font-medium">
                                        {slot}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {form.formState.errors.availability && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.availability.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
