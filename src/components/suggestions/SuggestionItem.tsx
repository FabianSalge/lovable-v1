import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface SuggestionItemProps {
  suggestion: string;
  type: string;
  onAccept: () => void;
  onReject: () => void;
}

export const SuggestionItem = ({ suggestion, type, onAccept, onReject }: SuggestionItemProps) => {
  return (
    <div className="p-3 rounded-md glass-card relative group animate-fade-in">
      <h3 className="text-xs font-medium text-muted-foreground mb-2">
        Suggested {type}
      </h3>
      <p className="text-sm mb-3">{suggestion}</p>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 hover:bg-destructive/20"
          onClick={onReject}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 hover:bg-primary/20"
          onClick={onAccept}
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};