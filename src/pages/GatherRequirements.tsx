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
import { MessagesContainer } from "@/components/messages/MessagesContainer";
import { RequirementsList } from "@/components/requirements/RequirementsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      role: "assistant" as const,
      content: "Hi! I'll help you gather requirements for your project. Let's start with the basics - what's the name of your project?",
    },
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [showPRD, setShowPRD] = useState(false);

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

  const generatePRD = () => {
    const projectName = requirements.find(r => r.type === "Project Name")?.value || "Untitled Project";
    const clientName = requirements.find(r => r.type === "Client Name")?.value || "Unknown Client";
    const objectives = requirements.find(r => r.type === "Objectives")?.value || "No objectives specified";
    const scope = requirements.find(r => r.type === "Scope")?.value || "No scope specified";
    const constraints = requirements.find(r => r.type === "Constraints")?.value || "No constraints specified";

    return `
# Product Requirements Document

## Project Overview
**Project Name:** ${projectName}
**Client:** ${clientName}
**Date:** ${new Date().toLocaleDateString()}

## Project Objectives
${objectives}

## Scope
${scope}

## Constraints and Limitations
${constraints}

## Requirements Summary
${requirements.map(req => `- **${req.type}:** ${req.value}`).join('\n')}
    `.trim();
  };

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
        content: "Thank you! I've gathered all the requirements. You can now view the generated PRD or review the requirements in the sidebar.",
      });
      toast({
        title: "Requirements Gathered",
        description: "All requirements have been successfully collected.",
      });
      setShowPRD(true);
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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 fixed top-0 w-full z-50">
        <nav className="container flex items-center justify-between h-14">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="text-sm font-medium">AI Requirements Gathering</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm">View Requirements</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Gathered Requirements</SheetTitle>
              </SheetHeader>
              <RequirementsList 
                requirements={requirements}
                onDelete={handleDeleteRequirement}
              />
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="flex-1 container py-8 mt-14">
        <Card className="max-w-2xl mx-auto glass-card border-border/40">
          <MessagesContainer 
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
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
        </Card>
      </main>

      <Dialog open={showPRD} onOpenChange={setShowPRD}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Generated PRD</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 h-full">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {generatePRD()}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GatherRequirements;