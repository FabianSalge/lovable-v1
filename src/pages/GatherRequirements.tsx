import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MessagesContainer } from "@/components/messages/MessagesContainer";
import { RequirementsList } from "@/components/requirements/RequirementsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { generatePDF } from "@/utils/pdfGenerator";
import { SuggestionsPanel } from "@/components/suggestions/SuggestionsPanel";
import { ChatInput } from "@/components/chat/ChatInput";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type Requirement = {
  id: string;
  type: string;
  value: string;
};

type Suggestion = {
  id: string;
  type: string;
  value: string;
};

const GatherRequirements = () => {
  const navigate = useNavigate();
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
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

  const handleViewDevelopers = () => {
    navigate("/developers");
  };

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

  const handleDownloadPDF = () => {
    const content = generatePRD();
    const pdf = generatePDF(content);
    pdf.save('requirements-document.pdf');
    
    toast({
      title: "PDF Generated",
      description: "Your PRD has been downloaded successfully.",
    });
  };

  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    setRequirements(prev => [...prev, suggestion]);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    toast({
      title: "Suggestion Accepted",
      description: `Added ${suggestion.type.toLowerCase()} to requirements.`,
    });
  };

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
    toast({
      description: "Suggestion rejected",
    });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: input }
    ];

    const newRequirement: Requirement = {
      id: Date.now().toString(),
      type: requirementTypes[currentStep],
      value: input,
    };

    const mockSuggestions: Suggestion[] = [
      {
        id: `suggestion-${Date.now()}-1`,
        type: requirementTypes[currentStep],
        value: `Alternative: ${input} (Enhanced Version)`,
      },
      {
        id: `suggestion-${Date.now()}-2`,
        type: requirementTypes[currentStep],
        value: `Consider: ${input} (Modified Approach)`,
      },
    ];
    setSuggestions(prev => [...prev, ...mockSuggestions]);

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
        content: "Thank you! I've gathered all the requirements. You can now view the matched developers or review the requirements in the sidebar.",
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
      description: "Requirement removed",
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
          <div className="w-[70px]" />
        </nav>
      </header>

      <main className="flex-1 container py-8 mt-14 flex gap-6">
        <Card className="flex-1 glass-card border-border/40 flex flex-col h-[calc(100vh-8rem)]">
          <MessagesContainer 
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </Card>

        <div className="w-80 space-y-6">
          <Card className="glass-card border-border/40">
            <div className="p-4 border-b border-border/40 flex justify-between items-center">
              <h2 className="text-sm font-medium">Requirements</h2>
              {requirements.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewDevelopers}
                  className="text-xs"
                >
                  View Developers
                </Button>
              )}
            </div>
            <RequirementsList
              requirements={requirements}
              onDelete={handleDeleteRequirement}
            />
          </Card>

          <Card className="glass-card border-border/40">
            <div className="p-4 border-b border-border/40">
              <h2 className="text-sm font-medium">Suggestions</h2>
            </div>
            <SuggestionsPanel
              suggestions={suggestions}
              onAccept={handleAcceptSuggestion}
              onReject={handleRejectSuggestion}
            />
          </Card>
        </div>
      </main>

      <Dialog open={showPRD} onOpenChange={setShowPRD}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Next Steps</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Your requirements have been gathered successfully. You can now:</p>
            <div className="flex gap-4">
              <Button onClick={handleViewDevelopers} className="flex-1">
                View Matched Developers
              </Button>
              <Button onClick={handleDownloadPDF} variant="secondary" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download PRD
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GatherRequirements;
