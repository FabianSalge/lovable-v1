import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GatherRequirements from "./pages/GatherRequirements";
import DeveloperMatching from "./pages/DeveloperMatching";

const queryClient = new QueryClient();

// Mock authentication - replace with your actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/gather"
            element={
              <ProtectedRoute>
                <GatherRequirements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers"
            element={
              <ProtectedRoute>
                <DeveloperMatching />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;