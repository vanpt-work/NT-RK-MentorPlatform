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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import {
    availabilitySlots,
    expertiseAreas,
    type ProfileStepProps,
} from "../types";

export function ProfileStep({
    form,
    avatarPreview,
    onAvatarChange,
    hideRoleSelection = false,
}: ProfileStepProps) {
    // Handle expertise selection
    const handleExpertiseChange = (expertise: string) => {
        const currentExpertise = form.getValues("expertises") || [];
        const updatedExpertise = currentExpertise.includes(expertise)
            ? currentExpertise.filter((e) => e !== expertise)
            : [...currentExpertise, expertise];

        form.setValue("expertises", updatedExpertise, {
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

    // Handle communication method selection
    const handleCommunicationChange = (method: "Video call" | "Audio call" | "Text chat") => {
        form.setValue("communicationPreference", method, {
            shouldValidate: true,
        });
    };

    // Character count functions
    const getBioCharCount = () => {
        const bio = form.watch("bio") || "";
        return bio.length;
    };

    const getProfessionalSkillsCharCount = () => {
        const skills = form.watch("professionalSkill") || "";
        return skills.length;
    };

    const getIndustryExperienceCharCount = () => {
        const experience = form.watch("experience") || "";
        return experience.length;
    };

    const getGoalsCharCount = () => {
        const goals = form.watch("goals") || "";
        return goals.length;
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
                            <div className="flex justify-between">
                                <Label htmlFor="bio">Bio</Label>
                                <span className="text-xs text-muted-foreground">
                                    {getBioCharCount()}/2000
                                </span>
                            </div>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                className="min-h-24"
                                maxLength={2000}
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
                                <p className="text-xs text-muted-foreground">
                                    Maximum file size: 5MB
                                </p>
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
                                                        "expertises",
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
                            <p className="text-xs text-muted-foreground">
                                Select areas that best represent your expertise
                            </p>
                            {form.formState.errors.expertises && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.expertises.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Professional Skills</Label>
                                    <span className="text-xs text-muted-foreground">
                                        {getProfessionalSkillsCharCount()}/200
                                    </span>
                                </div>
                                <Textarea
                                    id="professionalSkills"
                                    placeholder="e.g. JavaScript, Project Management, Research"
                                    className="min-h-16"
                                    maxLength={200}
                                    {...form.register("professionalSkill")}
                                />
                                {form.formState.errors.professionalSkill && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors.professionalSkill
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label htmlFor="industryExperience">Industry Experience</Label>
                                    <span className="text-xs text-muted-foreground">
                                        {getIndustryExperienceCharCount()}/200
                                    </span>
                                </div>
                                <Textarea
                                    id="industryExperience"
                                    placeholder="e.g. 5 years in Tech, 3 years in Finance"
                                    className="min-h-16"
                                    maxLength={200}
                                    {...form.register("experience")}
                                />
                                {form.formState.errors.experience && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.experience.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Goals row */}
                    <div className="grid grid-cols-1">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label htmlFor="goals">Goals</Label>
                                <span className="text-xs text-muted-foreground">
                                    {getGoalsCharCount()}/200
                                </span>
                            </div>
                            <Textarea
                                id="goals"
                                placeholder="What do you want to achieve?"
                                className="min-h-16"
                                maxLength={200}
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
                                    form.getValues("communicationPreference") === "Video call"
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
                                    form.getValues("communicationPreference") === "Audio call"
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
                                    form.getValues("communicationPreference") === "Text chat"
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
                        <p className="text-xs text-muted-foreground">
                            Select your preferred method for mentorship sessions
                        </p>
                        {form.formState.errors.communicationPreference && (
                            <p className="text-sm text-red-500">
                                {
                                    form.formState.errors.communicationPreference
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
                        <p className="text-xs text-muted-foreground">
                            Select when you're typically available for sessions
                        </p>
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
