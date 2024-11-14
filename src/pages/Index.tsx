import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ClipboardCheck, LineChart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container flex items-center justify-between h-16">
          <span className="text-xl font-semibold">Requirements.ai</span>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container py-24 space-y-8">
          <div className="space-y-4 text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Streamline Your Consultancy Requirements
            </h1>
            <p className="text-lg text-zinc-500">
              Automate your requirements gathering process with our intelligent system.
              Save time and improve accuracy.
            </p>
            <Button size="lg" asChild className="hover-scale">
              <Link to="/gather">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <Card className="p-6 glass-card hover-scale">
              <ClipboardCheck className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Forms</h3>
              <p className="text-zinc-500">
                Intelligent forms that adapt to your project's needs and guide you through
                the process.
              </p>
            </Card>

            <Card className="p-6 glass-card hover-scale">
              <Users className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-zinc-500">
                Work together with your team and clients in real-time with built-in
                collaboration tools.
              </p>
            </Card>

            <Card className="p-6 glass-card hover-scale">
              <LineChart className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Analytics</h3>
              <p className="text-zinc-500">
                Get insights into your requirements gathering process and track progress
                effectively.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-zinc-500">
          <p>© 2024 Requirements.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;