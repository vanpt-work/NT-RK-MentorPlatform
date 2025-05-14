import type { UseFormReturn } from "react-hook-form";
import { 
  GraduationCap, 
  Lightbulb,
  BarChart4,
  Code,
  Palette,
  LineChart,
  Database,
  Briefcase,
  ClipboardList,
  MessagesSquare
} from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import type { ProfileFormValues } from "../../../types/Account";
import { expertiseAreas, professionalSkills, availabilitySlots } from "../../../types/Account";

interface ProfileStepProps {
  form: UseFormReturn<ProfileFormValues>;
  avatarPreview: string | null;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileStep({ form, avatarPreview, onAvatarChange }: ProfileStepProps) {
  // Handle expertise selection
  const handleExpertiseChange = (expertise: string) => {
    const currentExpertise = form.getValues("expertise") || [];
    const updatedExpertise = currentExpertise.includes(expertise)
      ? currentExpertise.filter(e => e !== expertise)
      : [...currentExpertise, expertise];
    
    form.setValue("expertise", updatedExpertise, { 
      shouldValidate: true 
    });
  };
  
  // Handle professional skills selection
  const handleSkillChange = (skill: string) => {
    const currentSkills = form.getValues("professionalSkills") || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    form.setValue("professionalSkills", updatedSkills, { 
      shouldValidate: true 
    });
  };
  
  // Handle availability selection
  const handleAvailabilityChange = (slot: string) => {
    const currentAvailability = form.getValues("availability") || [];
    const updatedAvailability = currentAvailability.includes(slot)
      ? currentAvailability.filter(a => a !== slot)
      : [...currentAvailability, slot];
    
    form.setValue("availability", updatedAvailability, { 
      shouldValidate: true 
    });
  };

  return (
    <form className="space-y-8">
      <div className="pt-2 mb-6">
        <h3 className="text-lg font-medium mb-2">I am joining as:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center transition-all ${
              form.getValues("role") === "learner" 
                ? "border-primary bg-primary/5" 
                : "hover:border-gray-400"
            }`}
            onClick={() => form.setValue("role", "learner", { shouldValidate: true })}
          >
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
            <h4 className="text-lg font-medium">Learner</h4>
            <p className="text-sm text-muted-foreground">I want to find mentors</p>
          </div>

          <div 
            className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center transition-all ${
              form.getValues("role") === "mentor" 
                ? "border-primary bg-primary/5" 
                : "hover:border-gray-400"
            }`}
            onClick={() => form.setValue("role", "mentor", { shouldValidate: true })}
          >
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              <Lightbulb className="w-12 h-12 text-primary" />
            </div>
            <h4 className="text-lg font-medium">Mentor</h4>
            <p className="text-sm text-muted-foreground">I want to mentor others</p>
          </div>
        </div>
        {form.formState.errors.role && (
          <p className="text-sm text-red-500 mt-2">{form.formState.errors.role.message}</p>
        )}
      </div>
      
      {/* Profile Information Block */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Basic Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
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
                <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Profile Picture</Label>
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview || ""} />
                  <AvatarFallback>{form.getValues("fullName")?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="relative">
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onAvatarChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById("avatar")?.click()}
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
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Expertise & Skills</h3>
        <div className="space-y-6">
          {/* Expertise and Skills row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      className={`p-3 border rounded-lg cursor-pointer flex items-center space-x-2 transition-all ${
                        (form.getValues("expertise") || []).includes(expertise) 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => handleExpertiseChange(expertise)}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{expertise}</span>
                    </div>
                  );
                })}
              </div>
              {form.formState.errors.expertise && (
                <p className="text-sm text-red-500">{form.formState.errors.expertise.message}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label>Professional Skills</Label>
              <div className="grid grid-cols-2 gap-2">
                {professionalSkills.map((skill) => (
                  <div 
                    key={skill} 
                    className={`p-3 border rounded-lg cursor-pointer flex items-center space-x-2 transition-all ${
                      (form.getValues("professionalSkills") || []).includes(skill) 
                        ? "border-primary bg-primary/5" 
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => handleSkillChange(skill)}
                  >
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
              {form.formState.errors.professionalSkills && (
                <p className="text-sm text-red-500">{form.formState.errors.professionalSkills.message}</p>
              )}
            </div>
          </div>
          
          {/* Experience and Goals row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="experience">Experience Level</Label>
              <Select 
                defaultValue=""
                onValueChange={(value) => 
                  form.setValue("experience", value, { 
                    shouldValidate: true 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                  <SelectItem value="expert">Expert (5+ years)</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.experience && (
                <p className="text-sm text-red-500">{form.formState.errors.experience.message}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                placeholder="What do you want to achieve?"
                className="min-h-16"
                {...form.register("goals")}
              />
              {form.formState.errors.goals && (
                <p className="text-sm text-red-500">{form.formState.errors.goals.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Availability Block */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Communication & Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="communication">Preferred Communication Method</Label>
              <Select 
                defaultValue={form.getValues("communication")}
                onValueChange={(value) => 
                  form.setValue("communication", value as "video" | "audio" | "text", { 
                    shouldValidate: true 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select communication method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="audio">Audio Call</SelectItem>
                  <SelectItem value="text">Text Chat</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.communication && (
                <p className="text-sm text-red-500">{form.formState.errors.communication.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Your Availability</Label>
              <div className="grid grid-cols-2 gap-2">
                {availabilitySlots.map((slot) => (
                  <div 
                    key={slot} 
                    className={`p-3 border rounded-lg cursor-pointer flex items-center space-x-2 transition-all ${
                      (form.getValues("availability") || []).includes(slot) 
                        ? "border-primary bg-primary/5" 
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => handleAvailabilityChange(slot)}
                  >
                    <span className="text-sm font-medium">{slot}</span>
                  </div>
                ))}
              </div>
              {form.formState.errors.availability && (
                <p className="text-sm text-red-500">{form.formState.errors.availability.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
} 