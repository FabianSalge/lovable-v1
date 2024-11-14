import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";

interface DeveloperCardProps {
  developer: {
    name: string;
    pastProjects: Array<{
      name: string;
      description: string;
    }>;
    rating: number;
    matchScore: number;
    profileUrl: string;
  };
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <Card className="p-4 glass-card border-border/40 hover-scale">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{developer.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">{developer.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          {developer.pastProjects.map((project) => (
            <div
              key={project.name}
              className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors"
            >
              <h4 className="font-medium text-sm">{project.name}</h4>
              <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Match Score: {developer.matchScore}%
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={developer.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};