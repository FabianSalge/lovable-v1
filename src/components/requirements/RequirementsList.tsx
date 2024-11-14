import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

type Requirement = {
  id: string;
  type: string;
  value: string;
};

interface RequirementsListProps {
  requirements: Requirement[];
  onDelete: (id: string) => void;
}

export const RequirementsList = ({ requirements, onDelete }: RequirementsListProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
      <div className="space-y-3">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="p-3 rounded-md bg-secondary/30 border border-border/50 relative group animate-fade-in"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(req.id)}
            >
              <X className="h-3 w-3" />
            </Button>
            <h3 className="text-xs font-medium text-muted-foreground">
              {req.type}
            </h3>
            <p className="mt-1 text-sm">{req.value}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};