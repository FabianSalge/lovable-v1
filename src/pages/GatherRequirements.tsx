import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const GatherRequirements = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'll help you gather requirements for your project. Let's start with the basics - what's the name of your project?",
    },
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState({
    projectName: "",
    clientName: "",
    objectives: "",
    scope: "",
    constraints: "",
  });

  const questions = [
    "What's the name of your project?",
    "Great! Who's the client for this project?",
    "Could you tell me about the main objectives of this project?",
    "What's included in the scope of this project?",
    "Finally, what are the key constraints or limitations we should be aware of?",
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];

    // Update requirements based on current step
    const updatedRequirements = { ...requirements };
    switch (currentStep) {
      case 0:
        updatedRequirements.projectName = input;
        break;
      case 1:
        updatedRequirements.clientName = input;
        break;
      case 2:
        updatedRequirements.objectives = input;
        break;
      case 3:
        updatedRequirements.scope = input;
        break;
      case 4:
        updatedRequirements.constraints = input;
        break;
    }
    setRequirements(updatedRequirements);

    // Move to next question if available
    if (currentStep < questions.length - 1) {
      newMessages.push({
        role: "assistant",
        content: questions[currentStep + 1],
      });
      setCurrentStep(currentStep + 1);
    } else if (currentStep === questions.length - 1) {
      // Final message
      newMessages.push({
        role: "assistant",
        content: "Thank you! I've gathered all the requirements. You can review them in the summary that will be generated.",
      });
      toast({
        title: "Requirements Gathered",
        description: "All requirements have been successfully collected.",
      });
    }

    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container flex items-center justify-between h-16">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="text-xl font-semibold">AI Requirements Gathering</span>
        </nav>
      </header>

      <main className="flex-1 container py-8">
        <Card className="max-w-2xl mx-auto p-6 glass-card">
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
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
                      "max-w-[80%] rounded-lg p-4",
                      message.role === "assistant"
                        ? "bg-secondary/10"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your response..."
                className="min-h-[80px]"
              />
              <Button
                onClick={handleSendMessage}
                className="self-end hover-scale"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default GatherRequirements;