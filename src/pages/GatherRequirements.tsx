import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  objectives: z.string().min(10, "Please provide detailed objectives"),
  scope: z.string().min(10, "Please provide detailed scope"),
  constraints: z.string().min(10, "Please provide detailed constraints"),
});

const GatherRequirements = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      objectives: "",
      scope: "",
      constraints: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Requirements Saved",
      description: "Your requirements have been successfully saved.",
    });
    console.log(values);
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
          <span className="text-xl font-semibold">Gather Requirements</span>
        </nav>
      </header>

      <main className="flex-1 container py-8">
        <Card className="max-w-2xl mx-auto p-6 glass-card animate-fade-in">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Objectives</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What are the main objectives of this project?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the key goals and outcomes expected from this project.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Scope</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What is included in the scope of this project?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Define what is included and excluded from the project scope.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What are the key constraints or limitations?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any technical, budget, or time constraints.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full hover-scale">
                <Save className="mr-2 h-4 w-4" /> Save Requirements
              </Button>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default GatherRequirements;