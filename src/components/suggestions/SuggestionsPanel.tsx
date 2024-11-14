import { ScrollArea } from "@/components/ui/scroll-area";
import { SuggestionItem } from "./SuggestionItem";

interface SuggestionsPanelProps {
  suggestions: Array<{
    id: string;
    type: string;
    value: string;
  }>;
  onAccept: (suggestion: { id: string; type: string; value: string }) => void;
  onReject: (id: string) => void;
}

export const SuggestionsPanel = ({ suggestions, onAccept, onReject }: SuggestionsPanelProps) => {
  if (suggestions.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No suggestions available
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(50vh-4rem)]">
      <div className="space-y-3 p-4">
        {suggestions.map((suggestion) => (
          <SuggestionItem
            key={suggestion.id}
            type={suggestion.type}
            suggestion={suggestion.value}
            onAccept={() => onAccept(suggestion)}
            onReject={() => onReject(suggestion.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};