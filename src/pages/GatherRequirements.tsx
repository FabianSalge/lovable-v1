import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type Requirement = {
  id: string;
  type: string;
  value: string;
};

const GatherRequirements = () => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'll help you gather requirements for your project. Let's start with the basics - what's the name of your project?",
    },
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const questions = [
    "What's the name of your project?",
    "Great! Who's the client for this project?",
    "Could you tell me about the main objectives of this project?",
    "What's included in the scope of this project?",
    "Finally, what are the key constraints or limitations we should be aware of?",
  ];

  const requirementTypes = [
    "Project Name",
    "Client Name",
    "Objectives",
    "Scope",
    "Constraints",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: input }
    ];

    // Add requirement
    const newRequirement: Requirement = {
      id: Date.now().toString(),
      type: requirementTypes[currentStep],
      value: input,
    };
    setRequirements(prev => [...prev, newRequirement]);

    if (currentStep < questions.length - 1) {
      newMessages.push({
        role: "assistant" as const,
        content: questions[currentStep + 1],
      });
      setCurrentStep(currentStep + 1);
    } else if (currentStep === questions.length - 1) {
      newMessages.push({
        role: "assistant" as const,
        content: "Thank you! I've gathered all the requirements. You can review them in the sidebar.",
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

  const handleDeleteRequirement = (id: string) => {
    setRequirements(prev => prev.filter(req => req.id !== id));
    toast({
      title: "Requirement Deleted",
      description: "The requirement has been removed.",
    });
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">View Requirements</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Gathered Requirements</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-lg border bg-card relative group animate-fade-in"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteRequirement(req.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <h3 className="font-medium text-sm text-muted-foreground">
                        {req.type}
                      </h3>
                      <p className="mt-1">{req.value}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="flex-1 container py-8">
        <Card className="max-w-2xl mx-auto p-6 glass-card">
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex animate-fade-in",
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4 animate-fade-in-scale",
                        message.role === "assistant"
                          ? "bg-secondary/10"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

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