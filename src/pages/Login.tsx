import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" asChild className="p-0">
              <Link to="/register">Register here</Link>
            </Button>
          </p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}