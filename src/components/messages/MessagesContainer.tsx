import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { RefObject } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

interface MessagesContainerProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

export const MessagesContainer = ({ messages, messagesEndRef }: MessagesContainerProps) => {
  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "assistant" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "message-bubble",
                message.role === "assistant"
                  ? "message-bubble-assistant"
                  : "message-bubble-user",
                "max-w-[80%]"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};