import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DeveloperCard } from "@/components/developers/DeveloperCard";

const mockDevelopers = [
  {
    name: "Alex Chen",
    skills: ["React", "TypeScript", "Node.js"],
    rating: 4.8,
    matchScore: 95,
    profileUrl: "#",
  },
  {
    name: "Sarah Johnson",
    skills: ["React", "Python", "AWS"],
    rating: 4.9,
    matchScore: 90,
    profileUrl: "#",
  },
  {
    name: "Michael Brown",
    skills: ["React", "Java", "Spring"],
    rating: 4.7,
    matchScore: 85,
    profileUrl: "#",
  },
];

const DeveloperMatching = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 fixed top-0 w-full z-50">
        <nav className="container flex items-center justify-between h-14">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/gather" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Requirements
            </Link>
          </Button>
          <span className="text-sm font-medium">Developer Matching</span>
          <div className="w-[70px]" />
        </nav>
      </header>

      <main className="flex-1 container py-8 mt-14">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-semibold">Matched Developers</h1>
            <p className="text-muted-foreground">
              Based on your project requirements, here are the most suitable developers
            </p>
          </div>

          <div className="grid gap-4">
            {mockDevelopers.map((developer) => (
              <DeveloperCard key={developer.name} developer={developer} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperMatching;