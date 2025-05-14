import Header from "@/components/common/header";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Mentor Platform</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Connect with mentors in your field and accelerate your professional growth
        </p>
        
        <div className="flex gap-4 mt-6">
          <Button asChild size="lg">
            <Link to="/register">Register Now</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Find Mentors</h3>
            <p>Connect with experienced professionals who can guide your career journey</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
            <p>Engage in personalized sessions tailored to your specific goals and needs</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Share Knowledge</h3>
            <p>Become a mentor and give back to the community by sharing your expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
} 