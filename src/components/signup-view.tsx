"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Scroll, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupViewProps {
  onSignupSuccess: (username: string) => void;
  onBack: () => void;
  onLogin: () => void;
}

export default function SignupView({ onSignupSuccess, onBack, onLogin }: SignupViewProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      onSignupSuccess(data.user.username);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 z-20 text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel rounded-2xl p-8 shadow-2xl border border-primary/20 backdrop-blur-xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="inline-block p-3 rounded-full bg-primary/10 mb-4 border border-primary/30"
            >
              <Scroll className="w-8 h-8 text-primary animate-float" />
            </motion.div>
            <h1 className="text-3xl font-bold gold-gradient-text mb-2 font-serif">Begin Your Tale</h1>
            <p className="text-muted-foreground">Join the caravan of legends</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/80 ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                placeholder="Scheherazade"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/80 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join the Caravan"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have a scroll?{" "}
            <button onClick={onLogin} className="text-primary hover:text-amber-300 transition-colors font-medium hover:underline">
              Login here
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
