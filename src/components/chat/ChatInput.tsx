import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ input, setInput, handleSendMessage, handleKeyPress }: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-border/40">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your response..."
          className="min-h-[80px] linear-input resize-none"
        />
        <Button
          onClick={handleSendMessage}
          className="self-end hover-scale"
          size="icon"
          variant="secondary"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};