
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:px-8 border-b",
        scrolled ? "bg-black/70 backdrop-blur-lg border-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute w-8 h-8 bg-neon-teal rounded-full opacity-30 animate-pulse-glow"></div>
                <div className="absolute w-6 h-6 bg-neon-teal rounded-full top-1 left-1"></div>
              </div>
              <span className="font-semibold text-xl text-foreground">
                Twin<span className="text-primary neon-glow">Speak</span>
              </span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#use-cases" className="text-foreground hover:text-primary transition-colors">Use Cases</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/10">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 neon-box">
              Create Avatar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
